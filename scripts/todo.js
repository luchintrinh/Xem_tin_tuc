"use strict";

let add = document.querySelector("#btn-add");
let inputTask = document.querySelector("#input-task");
let todoList = document.querySelector("#todo-list");

let currentUser = localStorage.hasOwnProperty("currentUser")
  ? JSON.parse(getFromStorage("currentUser", ""))
  : "";
let owner = currentUser.userName ? currentUser.userName : "";

function parseTask(taskData) {
  const task = new Task(taskData.Task, taskData.owner, taskData.isDone);
  return task;
}

// danh sách nhiệm vụ
let todoArr = localStorage.hasOwnProperty("")
  ? JSON.parse(getFromStorage("todoArr", []))
  : [];

// xử lý xử kiện khi toggle và tasks
function toggleTask() {
  todoList.querySelectorAll("li").forEach(function (el, index) {
    el.addEventListener("click", function (e) {
      if (e.target !== el.children[0]) {
        el.classList.toggle("checked");
        // khi ấn vào hoàn thành thì câp nhật lên danh sách nhiệm vụ đã hoàn thành
        todoArr[index].isDone = el.classList.contains("checked") ? true : false;
        saveToStorage("todoArr", JSON.stringify(todoArr));
      }
    });
  });
}
class Task {
  constructor(task, owner, isDone) {
    this.Task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
// Xóa nhiệm vụ
function removeTask(task) {
  todoArr = localStorage.hasOwnProperty("todoArr")
    ? JSON.parse(getFromStorage("todoArr", []))
    : [];
  let find = todoArr.findIndex(function (el) {
    return parseTask(el).task === task;
  });
  todoArr.splice(find, 1);
  saveToStorage("todoArr", JSON.stringify(todoArr));
  renderTask();
}

function task() {
  renderTask();
  add.addEventListener("click", function () {
    if (currentUser !== "") {
      if (inputTask.value.length > 0) {
        const nv = new Task(inputTask.value, owner, false);
        todoArr.push(nv);
        saveToStorage("todoArr", JSON.stringify(todoArr));
        renderTask();
      } else {
        alert("Nhập tên nhiệm vụ đi!");
      }
    } else {
      alert("Hãy đăng nhập !");
    }
  });
}
function renderTask() {
  let html = "";
  todoArr = localStorage.hasOwnProperty("todoArr")
    ? JSON.parse(getFromStorage("todoArr", []))
    : [];
  todoArr.map(function (task) {
    if (parseTask(task).owner === owner) {
      if (!task.isDone) {
        html += `
        <li>
            ${parseTask(task).Task}
            <span class="close" onclick=removeTask(${
              parseTask(task).task
            })>×</span>
          </li>
        `;
      } else {
        html += `
      <li class="checked">
          ${parseTask(task).Task}
          <span class="close" onclick=removeTask(${
            parseTask(task).task
          })>×</span>
        </li>
      `;
      }
    }
  });
  todoList.innerHTML = html;
  toggleTask();
}
task();
