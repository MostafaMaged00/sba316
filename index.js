const btnPaste = document.getElementById("btnPaste");
const btnClear = document.getElementById("btnClear");
// const textAnlz = document.getElementsByName("textAnlz");

btnPaste.addEventListener("click", function () {
  console.log("test");
});

btnClear.addEventListener("click", function () {
  console.log("test");

  //clear list items
  listItems.innerHTML = "";
});
