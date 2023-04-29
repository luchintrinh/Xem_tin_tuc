"use strict";

let pageNumber = document.querySelector("#input-page-size");
let inputCategory = document.querySelector("#input-category");
let btnSubmit = document.querySelector("#btn-submit");

let userArr = localStorage.hasOwnProperty("userArr")
  ? JSON.parse(getFromStorage("userArr", []))
  : [];

let currentUser = localStorage.hasOwnProperty("currentUser")
  ? JSON.parse(getFromStorage("currentUser", ""))
  : "";

//   mặc định cài đặt
function defaultSetting() {
  pageNumber.value = currentUser.pageNumber;
  inputCategory.value = currentUser.category;
}
if (currentUser !== "") {
  defaultSetting();
}

// khi ấn vào lưu settings

btnSubmit.addEventListener("click", function () {
  if (currentUser !== "") {
    let index = userArr.findIndex((el) => el.userName === currentUser.userName);
    userArr[index].category = inputCategory.value;
    userArr[index].pageNumber = Number(pageNumber.value);
    saveToStorage("userArr", JSON.stringify(userArr));
    currentUser = userArr[index];
    console.log(currentUser);
    saveToStorage("currentUser", JSON.stringify(currentUser));
  } else {
    alert("Hãy dăng nhập đi!");
  }
});
