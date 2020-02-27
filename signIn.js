const name = document.getElementById("email");
const pass = document.getElementById("pass");
const button = document.getElementById("btn");

button.addEventListener("click", myFn);

function myFn(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email: name.value,
            password: pass.value
        })
    })
        .then(r => r.json())
        .then(response => {
            sessionStorage.setItem("token", response.token);
            window.location.assign("./index.html");
        });
}

// Hide/Show Buttons
var showBtn = document.getElementById("showPass")
var passField = document.querySelector("#pass")
var showBtn2 = document.getElementById("showPass2")
var passField2 = document.querySelector("#rePass")
function showFirstPassword() {
    if (passField.type === "password") {
        passField.type = "text"
    }
}

function hideFirstPassword() {
    if (passField.type === "text") {
        passField.type = "password"
    }
}

function showSecondPassword() {
    if (passField2.type === "password") {
        passField2.type = "text"
    }
}

function hideSecondPassword() {
    if (passField2.type === "text") {
        passField2.type = "password"
    }
}

showBtn.addEventListener("mouseover", showFirstPassword);
showBtn.addEventListener("mouseleave", hideFirstPassword);
showBtn2.addEventListener("mouseover", showSecondPassword);
showBtn2.addEventListener("mouseleave", hideSecondPassword);
// End Hide/Show Buttons
