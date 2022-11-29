const nameInput = document.querySelector(`.name`);
const passInput = document.querySelector(`.password`);
const loginBtn = document.querySelector(`#login-btn`);
const createBtn = document.querySelector(`#create-btn`);

let users = [];

function popupTrigger(
  title = "Title",
  text = "text",
  color = "white",
  show = true
) {
  const overlay = document.querySelector(`.overlay`);
  const popup = document.querySelector(`.popup`);
  const popupTitle = document.querySelector(`.popup__title`);
  const popupText = document.querySelector(`.popup__text`);

  if (!show) {
    overlay.style.opacity = 0;
    overlay.style.visibility = "hidden";
    popup.style.transform = "scale(0)";
    return;
  }

  popupTitle.innerHTML = title;
  popupText.innerHTML = text;

  if (show) {
    overlay.style.opacity = 1;
    overlay.style.visibility = "visible";
    popup.style.transform = "scale(1)";
    popup.style.boxShadow = `0 0 2px ${color}`;
  }
}

function setUsers(user) {
  let users = getUsers();

  if (user.name == "" || user.password == "") {
    popupTrigger("Error", "Username or Password Empty", "red");
    return;
  }

  for (const u of users) {
    if (u.name === user.name) {
      popupTrigger("Error", "This Username Already Exists", "red");
      return;
    }
  }

  users.push(user);

  popupTrigger("Success", "User added", "green");

  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  let users = JSON.parse(localStorage.getItem("users"));

  if (users == null) {
    users = [
      { name: "admin", password: "admin" },
      { name: "Dave", password: "1234" },
    ];
  }

  return users;
}

function addUser(name, password) {
  let user = {};
  user.name = name;
  user.password = password;

  setUsers(user);
}

function createLogin() {
  const name = nameInput.value;
  const pass = passInput.value;
  addUser(name, pass);
}

function auth(name, pass) {
  let users = getUsers();
  let loginSuccess = false;

  for (const user of users) {
    if (user.name === name && user.password === pass) {
      loginSuccess = true;
    }
  }

  if (loginSuccess) {
    popupTrigger("Success", "Login Success", "green");
  } else {
    popupTrigger("Error", "Username or Password Invalid", "red");
  }
}

function login() {
  const name = nameInput.value;
  const pass = passInput.value;

  auth(name, pass);
}

loginBtn.addEventListener("click", login);
createBtn.addEventListener("click", createLogin);
window.addEventListener("click", (e) => {
  if (e.target.className == "overlay") {
    popupTrigger("", "", "", false);
  }
});
