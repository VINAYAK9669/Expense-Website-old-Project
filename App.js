// Below code is for signup form
// Making the "show/Hide password" icon operatable
const showHideIcon = document.querySelector("#showHideIcon");
const username = document.getElementById("sUsername");
const Pass = document.querySelector("#sPassword");
const iconReplace = document.getElementById("eyeIcon");
const errorMessage = document.getElementById("alert-message");
const subtbtn = document.getElementById("sbtn");
const Passconfir = document.getElementById("sconfirmpass");
const signupForm = document.querySelector(".suform-container");
let userNamCritFul = false;
let userpassCritFul = false;
let ConfirmPasCritFul = false;
let UserExist = false;
const form = document.getElementById("signupForm");
const signupformcontainer = document.getElementById("sformContainer");

function FormHandler(e) {
  let PassValue = Pass.value;
  let ConfPassValue = Passconfir.value;
  const anyElment = e.target;
  const anyElmentId = e.target.id;

  console.log(anyElmentId);
  if (PassValue != "") {
    if (PassValue == ConfPassValue) {
      const formField = Passconfir.parentElement;
      const errorElement = formField.querySelector(".alert-message");
      const message = "";
      errorElement.innerText = message;
      ConfirmPasCritFul = true;
    }
  }
}

//TODO: the below function will trigger when we start to type in the confirm password text field
function Cnfirpass(e) {
  let PassValue = Pass.value;
  let ConfPassValue = Passconfir.value;
  const input = e.target;
  const formField = input.parentElement;
  const errorElement = formField.querySelector(".alert-message");
  if (Pass.value != Passconfir.value) {
    const message = "Password are not matching";
    errorElement.innerText = message;
    errorElement.style.display = "block";
    errorElement.style.color = "red";
    ConfirmPasCritFul = false;
  } else {
    errorElement.style.display = "none";
    ConfirmPasCritFul = true;
  }
  PassValue = Pass.value;
  ConfPassValue = Passconfir.value;
}

function errorHandlerFun(e) {
  const input = e.target;
  const formField = input.parentElement;
  const errorElement = formField.querySelector(".alert-message");
  const USERNAME = JSON.parse(window.localStorage.getItem("usersCredentials"));
  if (input.value.length < 3 && input.type == "text") {
    const message = "Username length should be greater than 3";
    errorElement.innerText = message;
    errorElement.style.display = "block";
    errorElement.style.color = "red";
    userNamCritFul = false;
  } else if (
    input.value.length > 3 &&
    input.type == "text" &&
    USERNAME != null
  ) {
    for (let i = 0; i < USERNAME.length; i++) {
      if (input.value == USERNAME[i].userName) {
        console.log("entered");
        const message = "User Name Already exists";
        errorElement.innerText = message;
        errorElement.style.display = "block";
        errorElement.style.color = "red";
        userNamCritFul = false;
        UserExist = true;
        return;
      } else {
        errorElement.style.display = "none";
        userNamCritFul = true;
        UserExist = false;
      }
    }
  } else if (input.value.length > 3 && input.type == "text") {
    const message = "";
    errorElement.innerText = message;
    userNamCritFul = true;
  } else if (input.value.length < 4 && input.type == "password") {
    const message = "Password length should be greater than 4";
    errorElement.innerText = message;
    errorElement.style.display = "block";
    errorElement.style.color = "red";
    userpassCritFul = false;
  } else if (input.value.length > 4 && input.type == "password") {
    errorElement.style.display = "none";
    userpassCritFul = true;
  } else {
  }
}

//check whether the data is stored in local storage

function checkerUsername(username) {
  const USERNAME = JSON.parse(window.localStorage.getItem("usersCredentials"));

  if (document.getElementById("sUsername") != null && USERNAME != null) {
    for (let i = 0; i < USERNAME.length; i++) {
      if (username == USERNAME[i].userName) {
        UserExist = true;
        return;
      } else {
        UserExist = false;
      }
    }
  }
}

function handleSubmit(e) {
  e.preventDefault();
  let userNameCr = document.getElementById("sUsername").value;
  checkerUsername(userNameCr);
  let passwordCr = document.getElementById("sPassword").value;
  if (
    userNamCritFul == true &&
    userpassCritFul == true &&
    ConfirmPasCritFul == true &&
    UserExist == false
  ) {
    alert("Welcome to Vinayan's Family, You are now our user");
    //window.location.href = "./index.html";
    //if everyting is correct, now will send this data to the local storage
    const usersCredentials =
      JSON.parse(localStorage.getItem("usersCredentials")) || [];
    (function addUserDetails() {
      // get type, name, date, and amount
      console.log("Bye");
      const usersCredential = {
        userName: userNameCr,
        password: passwordCr,
        id:
          usersCredentials.length > 0
            ? usersCredentials[usersCredentials.length - 1].id + 1
            : 1,
      };
      usersCredentials.push(usersCredential);
      // localStorages
      localStorage.setItem(
        "usersCredentials",
        JSON.stringify(usersCredentials)
      );

      document.getElementById("sigupForm").reset();
      if (!signupForm.classList.contains("hidden")) {
        signupForm.classList.toggle("hidden");
        const y = signupForm;
        y.classList.toggle("animatezoom");
        const x = loginForm;
        x.classList.toggle("animatezoom");
        loginForm.classList.toggle("hidden");
      }
    })();
  } else if (!userNamCritFul) {
    if (UserExist == true) {
      const message = "Choose another user Name";
      const errorElement =
        username.parentElement.querySelector(".alert-message");
      errorElement.innerText = message;
      errorElement.style.display = "block";
      errorElement.style.color = "red";
    } else {
      const message = "Username length should be greater than 3";
      const errorElement =
        username.parentElement.querySelector(".alert-message");
      errorElement.innerText = message;
      errorElement.style.display = "block";
      errorElement.style.color = "red";
    }
  } else if (!userpassCritFul) {
    const message = "Password length should be greater than 4";
    const errorElement = Pass.parentElement.querySelector(".alert-message");
    errorElement.innerText = message;
    errorElement.style.display = "block";
    errorElement.style.color = "red";
  } else if (!ConfirmPasCritFul) {
    const message = "Password are not matching";
    const errorElement =
      Passconfir.parentElement.querySelector(".alert-message");
    errorElement.innerText = message;
    errorElement.style.display = "block";
    errorElement.style.color = "red";
  } else {
  }
}

// index.html program

const homePage = document.querySelector(".hero-box");
const IndexPageBack = document.querySelector(".index_container");
const aboutPage = document.querySelector(".aboutPage");
const loginForm = document.querySelector(".loginform-container");

function showsignUpPag() {
  if (!loginForm.classList.contains("hidden")) {
    loginForm.classList.toggle("hidden");
    const y = loginForm;
    y.classList.toggle("animatezoom");
    const x = signupForm;
    x.classList.toggle("animatezoom");
    signupForm.classList.toggle("hidden");
  } else {
    const x = signupForm;
    x.classList.toggle("animatezoom");
    signupForm.classList.toggle("hidden");
    if (homePage != null) {
      homePage.classList.toggle("blur");
      IndexPageBack.classList.toggle("hideindexContent");
    } else if (aboutPage != null) {
      aboutPage.classList.toggle("blur");
    }
  }
}

function loginPage() {
  if (!signupForm.classList.contains("hidden")) {
    signupForm.classList.toggle("hidden");
    const y = signupForm;
    y.classList.toggle("animatezoom");
    const x = loginForm;
    x.classList.toggle("animatezoom");
    loginForm.classList.toggle("hidden");
  } else {
    const x = loginForm;
    x.classList.toggle("animatezoom");
    loginForm.classList.toggle("hidden");
    if (homePage != null) {
      homePage.classList.toggle("blur");
      IndexPageBack.classList.toggle("hideindexContent");
    } else if (aboutPage != null) {
      aboutPage.classList.toggle("blur");
    }
  }
}
let loginCriteria = false;
//creating a function that will check whether the login credentials esxist
function loginCredCheck(username, password) {
  const USERNAME = JSON.parse(window.localStorage.getItem("usersCredentials"));

  for (let i = 0; i < USERNAME.length; i++) {
    let UserName = USERNAME[i].userName;
    let PassWord = USERNAME[i].password;
    console.log("Hi " + UserName);

    if (UserName == username && password == PassWord) {
      loginCriteria = true;
      console.log("Entered");
      return;
    } else {
    }
  }
}
//login Window validation
function handleloginSubmit(e) {
  e.preventDefault();
  const CURRENTUSERNAME =
    JSON.parse(localStorage.getItem("CURRENTUSERNAME")) || [];
  CuUsername = document.getElementById("lUsername").value;
  // get type, name, date, and amount
  const objectofcurrentsername = {
    username: CuUsername,
    id: 0,
  };
  CURRENTUSERNAME.push(objectofcurrentsername);
  // localStorages
  localStorage.setItem("currentUsername", JSON.stringify(CURRENTUSERNAME));

  const USERNAME = JSON.parse(window.localStorage.getItem("usersCredentials"));
  if (USERNAME != null) {
    const Username = document.getElementById("lUsername").value;
    currentUsername = Username;
    const Password = document.getElementById("lPassword").value;
    loginCredCheck(Username, Password);
    if (loginCriteria == true) {
      alert("Login Successful");
      window.location.href = "./dashboard.html";
    } else {
      alert("Username or password are not matching");
    }
  } else {
    alert("No users are exist on this device. Please signup to use features");
  }
}

const ExpenseTool = document.querySelector(".tool");
const curTabLis = document.querySelector(".current_table_tool");
const history = document.querySelector(".content_table");

function ExpensionToolfunction() {
  if (
    !history.classList.contains(
      "hidden" || curTabLis.classList.contains("hidden")
    )
  ) {
    history.classList.toggle("hidden");
  }
  curTabLis.classList.toggle("hidden");
  ExpenseTool.classList.toggle("hidden");
}

//TODO: EXPENSION  TOOL
if (document.getElementById("expForm") != null) {
  console.log("Yevvo");
  document.getElementById("expForm").addEventListener("submit", addExpense);
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  function addExpense(e) {
    e.preventDefault();

    // initial array of expenses, reading from localStorage

    // get type, name, date, and amount
    let type = document.getElementById("type").value;
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let amount = document.getElementById("amount").value;

    const USERNAME = JSON.parse(
      window.localStorage.getItem("usersCredentials")
    );

    let currentusername = JSON.parse(localStorage.getItem("currentUsername"));
    let UserName = currentusername[0].username;
    console.log(UserName);
    if (type.length > 1 && name.length > 1 && date != 0 && amount > 0) {
      const expense = {
        UserName,
        type,
        name,
        date,
        amount,
        id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
      };

      expenses.push(expense);
      // localStorage
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
    showExpenses();
    document.querySelector(".tool_form").reset();
  }

  const showExpenses = () => {
    const expenseTable = document.getElementById("current_expenseTable");
    expenseTable.innerHTML += `
        <tr">
            <td >${document.getElementById("name").value}</td>
            <td >${document.getElementById("name").value}</td>
            <td >${document.getElementById("date").value}</td>
            <td >${document.getElementById("amount").value}</td>
            <td><svg xmlns="http://www.w3.org/2000/<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          
          </td>
            
        </tr>
    `;
  };
}

function ondashoardClick(e) {
  if (!ExpenseTool.classList.contains("hidden")) {
    ExpenseTool.classList.toggle("hidden");
    curTabLis.classList.toggle("hidden");
  }

  history.classList.toggle("hidden");

  const expenseTable = document.getElementById("expenseTable");
  let currentUsername = JSON.parse(localStorage.getItem("currentUsername"));
  let UserName = currentUsername[0].username;
  console.log(currentUsername);
  expenseTable.innerHTML = "";
  const expense = JSON.parse(localStorage.getItem("expenses"));
  if (expense == null) {
    alert("NO Expenses added in your list!");
  } else {
    for (let i = 0; i < expense.length; i++) {
      if (expense[i].UserName == UserName) {
        console.log(expense[i].UserName);
        expenseTable.innerHTML += `
          <tr">
              <td >${expense[i].type}</td>
              <td>${expense[i].name}</td>
              <td>${expense[i].date}</td>
              <td>₹${expense[i].amount}</td>
          </tr>
      `;
      } else {
      }
    }
  }
}
