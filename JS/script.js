let table = document.getElementById("table");
table.innerText = "Content Not Uploaded Yet !!";
const input = document.getElementById("input");
let tableInner = "";
const handleBlur = (event) => {
  console.log(1);
  const id = event.id;
  // console.log(event);
  // const data = document.getElementById(`${id}`);
  // data.removeAttribute("onblur");
  // data.setAttribute("onclick", "handleClick(this)");
  // data.innerHTML = `<td onclick="handleClick(this)" id="${id}" class ="border border-slate-600">${e}</td>`;
  console.log(event);
};
const handleClick = (event) => {
  const id = event.id;
  // console.log(event);
  const data = document.getElementById(`${id}`);
  data.removeAttribute("onclick");
  data.setAttribute("onblur", "handleBlur(this)");
  data.innerHTML = `<input id=${event.id}  type="text"/>`;
  console.log(event);
};

input.addEventListener("change", async () => {
  const fr = new FileReader();
  const fileType = input?.files[0].type;
  console.log(input?.files[0]);

  fr.onloadend = (e) => {
    if (
      fileType.includes("text/csv") ||
      fileType.includes(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      table.innerText = "";
      let r = fr.result.split("\n").map((e) => {
        return e.split(",");
      });

      r?.forEach((e, index) => {
        let m;
        if (index == 0) {
          m = e
            .map((e) => {
              return `<th class ="border border-slate-600">${e}</th>`;
            })
            .join("");
        } else {
          m = e
            .map((e, i) => {
              return `<td onclick="handleClick(this)" id="${index}${i}" class ="border border-slate-600">${e}</td>`;
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
    }
  };
  fr.readAsText(input.files[0]);
  input.value = "";
});
