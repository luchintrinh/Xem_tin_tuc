"use strict";

let userName = document.querySelector("#input-username");
let password = document.querySelector("#input-password");
let btnSubmit = document.querySelector("#btn-submit");

let userArr = localStorage.hasOwnProperty("userArr")
  ? JSON.parse(getFromStorage("userArr", []))
  : [];
let currentUser;

let login = {
  start: function () {
    this.handle();
  },
  handle: function () {
    let _this = this;
    btnSubmit.addEventListener("click", function () {
      console.log("click");
      _this.validate();
    });
  },
  validate: function () {
    if (userName.value == "") {
      alert("Nhập tên đăng nhập!");
    } else if (password.value == "") {
      alert("Nhập mật khẩu đi!");
    } else if (!this.checkExists(userName.value, password.value)) {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    } else {
      const curUser = userArr.filter(
        (user) => parseUser(user).userName === userName.value
      )[0];
      window.location.href = "../index.html";
      saveToStorage("currentUser", JSON.stringify(curUser));
    }
  },
  checkExists: function (userName, password) {
    console.log(typeof userArr);
    let num = userArr.filter(
      (user) =>
        parseUser(user).userName === userName &&
        parseUser(user).password === password
    );
    return num.length > 0 ? true : false;
  },
};

login.start();
