let table = document.getElementById("table");
table.innerText = "Content Not Uploaded Yet !!";
const input = document.getElementById("input");
let tableInner = "";
const handleClick = (event) => {
  const id = event.id;
  const data = document.getElementById(`${id}`);
  data.innerHTML = `<input id=${event.id} value="${event.innerText}" type="text"/>`;
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
