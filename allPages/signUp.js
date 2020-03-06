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




