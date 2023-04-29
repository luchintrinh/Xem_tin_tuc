"use strict";

class user {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.pageNumber = 5;
    this.category = "General";
  }
}

function parseUser(userData) {
  const newUser = new user(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );
  return newUser;
}
