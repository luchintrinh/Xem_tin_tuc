"use strict";

let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

let firstName = $("#input-firstname");
let lastName = $("#input-lastname");
let userName = $("#input-username");
let password = $("#input-password");
let passwordConfirm = $("#input-password-confirm");
let btnSubmit = $("#btn-submit");

// danh sách user

let userArr = localStorage.hasOwnProperty("userArr")
  ? JSON.parse(getFromStorage("userArr", []))
  : [];

let register = {
  start: function () {
    this.handle();
  },
  handle: function () {
    let _this = this;
    btnSubmit.addEventListener("click", function () {
      _this.validate();
    });
  },
  validate: function () {
    if (firstName.value == "") {
      alert("Nhập họ đi!");
    } else if (lastName.value == "") {
      alert("Nhập tên đi!");
    } else if (userName.value == "") {
      alert("Nhập tên đăng nhập!");
    } else if (this.checkExist(userName.value)) {
      alert("Tên đăng nhập đã có người sử dụng!");
    } else if (password.value == "") {
      alert("Nhập mật khẩu!");
    } else if (password.value != "" && password.value.length < 8) {
      alert("Mật khẩu phải từ 8 kí tự trở lên!");
    } else if (passwordConfirm.value == "") {
      alert("Xác nhận mật khẩu đi!");
    } else if (
      passwordConfirm.value != "" &&
      password.value != passwordConfirm.value
    ) {
      alert("Xác nhận không chính xác mật khẩu!");
    } else {
      const newUser = new user(
        firstName.value,
        lastName.value,
        userName.value,
        password.value
      );
      userArr.push(newUser);
      saveToStorage("userArr", JSON.stringify(userArr));
      window.location.href = "../pages/login.html";
    }
  },
  checkExist: function (userName) {
    console.log(userArr);
    let num = userArr.findIndex(
      (user) => parseUser(user).userName === userName
    );
    return num > 0 ? true : false;
  },
};

register.start();
