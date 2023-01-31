let table = document.getElementById("table");
table.innerText = "Content Not Uploaded Yet !!";
const input = document.getElementById("input");
input.addEventListener("change", async () => {
  const fr = new FileReader();
  const fileType = input?.files[0].type;
  console.log(input?.files[0]);

  fr.onloadend = (e) => {
    let read = fr.result;
    // if (
    //   fileType.includes("text/csv") ||
    //   fileType.includes(
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //   )
    // ) {
    let r = fr.result.split("\n").map((e) => {
      return e.split(",");
    });
    r?.forEach((e) => {
      let m = e
        .map((e) => {
          return `<td>${e}</td>`;
        })
        .join("");
      const ce = document.createElement("tr");
      ce.innerHTML = m;
      if (ce.innerHTML !== "") {
        table.append(ce);
      }
    });
    // } else {
    //   alert("Invalid Type");
    // }
  };
  fr.readAsText(input.files[0]);
});
