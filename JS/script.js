const htmlToCsv = () => {
  let csv = [];
  let tr = document.querySelectorAll("tr");
  for (let i = 0; i < tr.length; i++) {
    // console.log(tr[i]);
    let cols = tr[i].querySelectorAll("td,th");
    let csvRow = [];
    for (j = 0; j < cols.length; j++) {
      csvRow.push(cols[j].innerHTML);
    }
    csv.push(csvRow.join(","));
  }
  // console.log(tr);
  console.log(csv.join("\n"));
  let blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const a = document.getElementById("a");
  a.href = URL.createObjectURL(blob);
};
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
  console.log(id);

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
  console.log(data);
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
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, {
      type: "array",
    });
    var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    // header: 1 instructs xlsx to create an 'array of arrays'
    var result = XLSX.utils.sheet_to_json(firstSheet, {
      header: 1,
    });
    if (
      fileType.includes("text/csv") ||
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      table.innerText = "";
      console.log(result);
      // let r = result.split("\n").map((e) => {
      //   return e.split(",");
      // });
      let maxLength = -1;
      result.forEach((e) => {
        if (e.length > maxLength) {
          maxLength = e.length;
        }
      });

      result.forEach((singleResult, index) => {
        let range = math.range(0, maxLength);
        let m;
        console.log(singleResult);
        if (index == 0) {
          m = singleResult
            .map((e, i) => {
              console.log(e);

              {
                if (e && singleResult[i] == null) {
                  return `<th class ="border border-slate-600">empty</th>`;
                } else {
                  return `<th class ="border border-slate-600">${e}</th>`;
                }
              }
            })
            .join("");
        } else {
          m = singleResult
            .map((e, i) => {
              console.log(i);
              console.log(e);
              {
                {
                  if (e && singleResult[i].anoxi == "\0") {
                    return `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">empty</td>`;
                  } else {
                    return `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">${e}</td>`;
                  }
                }
              }
            })
            .join("");
        }
        const ce = document.createElement("tr");
        ce.setAttribute("class", "odd:bg-gray-300");
        ce.innerHTML = m;
        if (ce.innerHTML !== "") {
          tableInner += ce;
          table.append(ce);
        }
      });
    } else {
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
  a.setAttribute("onclick", "htmlToCsv()");
  document.getElementById("htmltocsv").append(a);
});
