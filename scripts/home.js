"use strict";

let loginModal = document.querySelector("#login-modal");
let mainContent = document.querySelector("#main-content");
let welcomeMessage = document.querySelector("#welcome-message");
let btnLogout = document.querySelector("#btn-logout");

// lấy người dùng đg đăng nhập
let currentUser = localStorage.hasOwnProperty("currentUser")
  ? JSON.parse(getFromStorage("currentUser", ""))
  : "";

//   hiển thị sau khi đăng nhập
function home() {
  if (currentUser !== "") {
    // ẩn giao diện đăng nhập
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${parseUser(currentUser).userName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }

  //   ấn nút đăng xuất
  btnLogout.addEventListener("click", function () {
    let ok = confirm("Bạn có muốn đăng xuất không?");
    if (ok) {
      loginModal.style.display = "block";
      mainContent.style.display = "none";
      localStorage.removeItem("currentUser");
    }
  });
}

home();
