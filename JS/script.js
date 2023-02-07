let col;
let row;
let dataFetch = [];
// const value = (index) => {
//   return dataFetch.filter((data) => {
//     data[index];
//   });
// };
const fetchJson = (dataFetch, index) => {
  let val;
  dataFetch.forEach((data) => {
    console.log(data.id);
    if (data.id == index - 1) {
      val = data.value;
    }
  });
  // console.log(dataFetch);
  // const data = Object.keys(dataFetch).filter((data) => {
  //   if (data == index - 1) {
  //     console.log(data);
  //   }
  // });
  // console.log(data);
  // const data = dataFetch.k.filter((data) => {
  //   data.keys == index - 1;
  // });
  return val;
};
const fetchData = async () => {
  const response = await fetch("../data/data2.json");
  dataFetch = await response.json();
  console.log(dataFetch);
};
fetchData();
// console.log(dataFetch[2].id);

function ExportToExcel(type, fn, dl) {
  // console.log(col);
  console.log(row);
  for (j = col + 1; j < col + 2; j++) {
    for (i = 0; i < row; i++) {
      if (i == 0) {
        // console.log(i, j);
        // console.log(document.getElementById(`${i}${j}`));
        // console.log(document.getElementById(`${i}${j - 1}`));
        document.getElementById(`${i}${j}`).innerText = document.getElementById(
          `${i}${j - 1}`
        ).innerText;
      } else {
        console.log(document.getElementById(`${i}${j}`).innerText);
        if (!document.getElementById(`${i}${j}`).innerText) {
          document.getElementById(`${i}${j}`).innerText =
            document.getElementById(`${i}${j - 1}`).innerText;
        }
        // if (!document.getElementById(`${i}${j}`).value) {
        //   document.getElementById(`${i}${j}`).innerText =
        //     document.getElementById(`${i}${j - 1}`).innerText;
        // } else {
        //   document.getElementById(`${i}${j}`).innerText =
        //     document.getElementById(`${i}${j - 1}`).innerText;
        // }
      }
      document.getElementById(`${i}${j - 1}`).style.display = "none";
    }
  }

  var elt = document.getElementById("table");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MySheetName." + "csv");
}
// function exportTableToExcel(tableID, filename = "") {
//   var downloadLink;
//   var dataType = "application/vnd.ms-excel";
//   var tableSelect = document.getElementById(tableID);
//   var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

//   // Specify file name
//   filename = filename ? filename + ".csv" : "excel_data.csv";

//   // Create download link element
//   downloadLink = document.createElement("a");

//   document.body.appendChild(downloadLink);

//   if (navigator.msSaveOrOpenBlob) {
//     var blob = new Blob(["\ufeff", tableHTML], {
//       type: dataType,
//     });
//     navigator.msSaveOrOpenBlob(blob, filename);
//   } else {
//     // Create a link to the file
//     downloadLink.href = "data:" + dataType + ", " + tableHTML;

//     // Setting the file name
//     downloadLink.download = filename;

//     //triggering the function
//     downloadLink.click();
//   }
// }

// function htmlTableToExcel(type) {
//   var data = document.getElementById("table");
//   var excelFile = XLSX.utils.table_to_book(data, { sheet: "sheet1" });
//   XLSX.write(excelFile, { bookType: type, bookSST: true, type: "base64" });
//   XLSX.writeFile(excelFile, "ExportedFile:HTMLTableToExcel" + type);
// }
// const htmlToCsv = () => {
//   // let table = document.querySelector("table");
//   // let table2excel = new table2excel();
//   // table2excel.export(document.querySelectorAll("table"));
//   let csv = [];
//   let tr = document.querySelectorAll("tr");
//   for (let i = 0; i < tr.length; i++) {
//     // console.log(tr[i]);
//     let cols = tr[i].querySelectorAll("td,th");
//     let csvRow = [];
//     for (j = 0; j < cols.length; j++) {
//       cols[j].innerHTML
//         ? csvRow.push(cols[j].innerHTML)
//         : csvRow.push((cols[j].innerHTML = ""));
//     }
//     csv.push(csvRow);
//   }
//   // console.log(tr);
//   // console.log(csv.join("\n"));
//   let blob = new Blob([csv], { type: "text/csv" });
//   const a = document.getElementById("a");
//   a.href = URL.createObjectURL(blob);
// };
let table = document.getElementById("table");

table.innerText = "Content Not Uploaded Yet !!";
const input = document.getElementById("input");
let tableInner = "";
const handleBlur = (event) => {
  let val = event.value;

  function checkVal() {
    if (!val) {
      // document.getElementById(`${event.id}`).focus();
      const value = prompt("Enter a Value");
      // alert("enter a value");
      val = value;
    } else {
      checkVal();
    }
  }
  if (!val) {
    checkVal();
  }

  const id = event.id.slice(0, event.id.length - 1);
  // console.log(id);

  // console.log(event);
  const data = document.getElementById(`${id}`);
  data.removeAttribute("onblur");
  data.setAttribute("onclick", "handleClick(this)");
  data.innerText = val;
  // console.log(event);
};
// const select = (id) => {
//   if (document.getElementById(`"${id}i"`)) {
//     console.log(document.getElementById(`"${id}i"`));
//     document.getElementById(`"${id}i"`).focus();
//   }
// };
// if (document.getElementById(`"${id}i"`)) {
// }
const handleClick = async (event) => {
  const id = event?.id;
  // console.log(event);
  const data = document.getElementById(`${id}`);

  data.removeAttribute("onclick");

  data.innerHTML = `<input id="${id}i" onblur="handleBlur(this)" type="text"/>`;
  // console.log(data);
  // select(id);
};

input.addEventListener("change", async () => {
  if (document.getElementById("a")) {
    const child = document.getElementById("a");
    child.parentNode.removeChild(child);
  }
  const fr = new FileReader();
  const fileType = input?.files[0].type;
  console.log(input?.files[0]);

  fr.onloadend = (e) => {
    if (
      // fileType.includes("text/csv") ||
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) ||
      fileType.includes("text/csv")
    ) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {
        type: "array",
      });
      var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      // header: 1 instructs xlsx to create an 'array of arrays'
      var result = XLSX.utils.sheet_to_json(firstSheet, {
        header: 1,
      });
      table.innerText = "";
      console.log(result);
      // let r = result.split("\n").map((e) => {
      //   return e.split(",");
      // });

      let max = -1;
      row = result.length;

      result.forEach((singleResult, index) => {
        col = singleResult.length;
        result.forEach((a, i) => {
          if (a.length > max) {
            max = a.length;
          }
        });
        let m;
        let html = "";
        let temp = [...Array(max).keys()];

        // console.log(singleResult);
        if (index == 0) {
          console.log(max);
          let en1;

          temp.forEach((en, i) => {
            if (singleResult[en]) {
              if (i == temp.length - 1) {
                html += `<th id="${index}${en}" class="border border-slate-600 p-3">${
                  singleResult[en]
                }</th>
                <th id="${index}${
                  en + 1
                }" class="border border-slate-600 p-3">${
                  singleResult[en]
                }(New Value)</th>`;
              } else {
                html += `<th id="${index}${en}" class="border border-slate-600 p-3">${singleResult[en]}</th>`;
              }
            } else {
              if (i == temp.length - 1) {
                html += `<th id="${index}${en}" class="border border-slate-600 p-3"></th>
                <th id="${index}${
                  en + 1
                }" class="border border-slate-600 p-3"></th>`;
              } else {
                html += `<th id="${index}${
                  en + 1
                }" class="border border-slate-600 p-3"></th>`;
              }
            }

            // console.log(singleResult[en]);
          });

          // html += `<th id="${index}${
          //   temp.length
          // }" class="border border-slate-600 p-3">${
          //   document.getElementById(`${index}${temp.length - 1}`)?.innerText
          // }(New Value)</th>`;
          // console.log();

          // console.log(temp.length);
          m = singleResult.map((e, i) => {
            // if (temp.includes(i)) {
            //   temp = temp.filter(function (item) {
            //     return item !== i;
            //   });
            //   // console.log(temp, "Header");
            // }
            // console.log(e);
            // console.log(i);
            // if (e[i]) {
            //   return `<th class ="border border-slate-600">${e}</th>`;
            // } else {
            //   return `<th class ="border border-slate-600">empty</th>`;
            // }
          });
          // .join("");
          // temp.map((em, i) => {
          //   console.log(em);
          //   // console.log(temp[++i]);
          //   if (temp[++i] - em == 1) {
          //     console.log(em);
          //     // console.log(em - temp[i++]);
          //     html += `<th class="border border-slate-600">empty</th>`;
          //     // console.log(html);
          //   } else {
          //     html += `<th class ="border border-slate-600">${
          //       singleResult[++em]
          //     }</th>`;
          //   }
          // });

          // console.log(html);
          // console.log(temp);
        } else {
          // let temp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          m = singleResult.map((e, i) => {
            // if (temp.includes(i)) {
            //   temp = temp.filter(function (item) {
            //     return item !== i;
            //   });
            //   // console.log(temp);
            // }
            // console.log(e);
            // {
            //   {
            //     if (!e[i]) {
            //       return `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">empty</td>`;
            //     } else {
            //       return `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">${e}</td>`;
            //     }
            //   }
            // }
          });
          // .join("");

          // let temp = [...Array(max).keys()];
          let num;
          temp.forEach((en) => {
            num = en;
            if (singleResult[en]) {
              html += `<td  id="${index}${en}" class ="border border-slate-600 p-3">${singleResult[en]}</td>`;
            } else {
              html += `<td  id="${index}${en}" class ="border border-slate-600 p-3"></td>`;
            }

            // console.log(singleResult[en]);
          });
          // const val = fetchJson(dataFetch, index);
          html += `<td onclick="handleClick(this)" id="${index}${
            num + 1
          }" class ="border border-slate-600 p-3">${
            dataFetch[index - 1] ? dataFetch[index - 1] : ""
          }</td>`;
          // temp.map((em, i) => {
          //   console.log(em);
          //   // console.log(temp[++i]);
          //   if (temp[++i] - em == 1) {
          //     console.log(em);
          //     // console.log(em - temp[i++]);
          //     html += `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">empty</td>`;
          //     // console.log(html);
          //   } else {
          //     html += `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">${
          //       singleResult[++em]
          //     }</td>`;
          //   }
          // });
        }
        const ce = document.createElement("tr");
        ce.setAttribute("class", "odd:bg-gray-300");
        ce.innerHTML = html;
        if (ce.innerHTML !== "") {
          tableInner += ce;
          table.append(ce);
        }
      });
    }
    // var data = new Uint8Array(e.target.result);
    // var workbook = XLSX.read(data, {
    //   type: "array",
    // });
    // var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    // // header: 1 instructs xlsx to create an 'array of arrays'
    // var result = XLSX.utils.sheet_to_json(firstSheet, {
    //   header: 1,
    // });
    // else if (
    //   fileType.includes("text/csv")
    //   //   fileType.includes(
    //   //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // ) {
    //   // table.innerText = "";
    //   // console.log(result);
    //   // // let r = result.split("\n").map((e) => {
    //   // //   return e.split(",");
    //   // // });
    //   // let max = -1;
    //   // result.forEach((singleResult, index) => {
    //   //   result.forEach((a, i) => {
    //   //     if (a.length > max) {
    //   //       max = a.length;
    //   //     }
    //   //   });
    //   //   let m;
    //   //   let html = "";
    //   //   let temp = [...Array(max).keys()];
    //   //   // console.log(singleResult);
    //   //   if (index == 0) {
    //   //     console.log(max);
    //   //     temp.forEach((en) => {
    //   //       if (singleResult[en]) {
    //   //         html += `<th class ="border border-slate-600 p-3">${singleResult[en]}</th>`;
    //   //       } else {
    //   //         html += `<th class="border border-slate-600 p-3"></th>`;
    //   //       }
    //   //       console.log(singleResult[en]);
    //   //     });
    //   //     m = singleResult.map((e, i) => {
    //   //       // if (temp.includes(i)) {
    //   //       //   temp = temp.filter(function (item) {
    //   //       //     return item !== i;
    //   //       //   });
    //   //       //   // console.log(temp, "Header");
    //   //       // }
    //   //       // console.log(e);
    //   //       // console.log(i);
    //   //       // if (e[i]) {
    //   //       //   return `<th class ="border border-slate-600">${e}</th>`;
    //   //       // } else {
    //   //       //   return `<th class ="border border-slate-600">empty</th>`;
    //   //       // }
    //   //     });
    //   //     // .join("");
    //   //     // temp.map((em, i) => {
    //   //     //   console.log(em);
    //   //     //   // console.log(temp[++i]);
    //   //     //   if (temp[++i] - em == 1) {
    //   //     //     console.log(em);
    //   //     //     // console.log(em - temp[i++]);
    //   //     //     html += `<th class="border border-slate-600">empty</th>`;
    //   //     //     // console.log(html);
    //   //     //   } else {
    //   //     //     html += `<th class ="border border-slate-600">${
    //   //     //       singleResult[++em]
    //   //     //     }</th>`;
    //   //     //   }
    //   //     // });
    //   //     console.log(html);
    //   //     console.log(temp);
    //   //   } else {
    //   //     // let temp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    //   //     m = singleResult.map((e, i) => {
    //   //       // if (temp.includes(i)) {
    //   //       //   temp = temp.filter(function (item) {
    //   //       //     return item !== i;
    //   //       //   });
    //   //       //   // console.log(temp);
    //   //       // }
    //   //       // console.log(e);
    //   //       // {
    //   //       //   {
    //   //       //     if (!e[i]) {
    //   //       //       return `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">empty</td>`;
    //   //       //     } else {
    //   //       //       return `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">${e}</td>`;
    //   //       //     }
    //   //       //   }
    //   //       // }
    //   //     });
    //   //     // .join("");
    //   //     // let temp = [...Array(max).keys()];
    //   //     temp.forEach((en) => {
    //   //       if (singleResult[en]) {
    //   //         html += `<td onclick="handleClick(this)" id="${index}${en}" class ="border border-slate-600 p-3">${singleResult[en]}</td>`;
    //   //       } else {
    //   //         html += `<td onclick="handleClick(this)" id="${index}${en}" class ="border border-slate-600 p-3"></td>`;
    //   //       }
    //   //       console.log(singleResult[en]);
    //   //     });
    //   //     // temp.map((em, i) => {
    //   //     //   console.log(em);
    //   //     //   // console.log(temp[++i]);
    //   //     //   if (temp[++i] - em == 1) {
    //   //     //     console.log(em);
    //   //     //     // console.log(em - temp[i++]);
    //   //     //     html += `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">empty</td>`;
    //   //     //     // console.log(html);
    //   //     //   } else {
    //   //     //     html += `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">${
    //   //     //       singleResult[++em]
    //   //     //     }</td>`;
    //   //     //   }
    //   //     // });
    //   //   }
    //   //   const ce = document.createElement("tr");
    //   //   ce.setAttribute("class", "odd:bg-gray-300");
    //   //   ce.innerHTML = html;
    //   //   if (ce.innerHTML !== "") {
    //   //     tableInner += ce;
    //   //     table.append(ce);
    //   //   }
    //   // });
    // }
    else {
      table.innerHTML = `<p class="text-xl text-red-200">Upload Valid Type Data !!</p>`;
      //
      // console.log(data);

      // console.log(result);
    }
  };
  fr.readAsArrayBuffer(input.files[0]);
  console.log(fr);
  input.value = "";
  const a = document.createElement("a");
  a.setAttribute(
    "class",
    "mt-5 ml-auto px-6 py-3 bg-gray-300 font-bold  hover:bg-red-300"
  );
  a.setAttribute("id", "a");
  a.innerText = "Download";
  // a.setAttribute("onclick", "htmlTableToExcel('csv')");
  // a.setAttribute("onclick", "htmlToCsv()");
  a.setAttribute("onclick", "ExportToExcel('xlsx')");

  // exportTableToExcel('tblData')
  document.getElementById("htmltocsv").append(a);
});
