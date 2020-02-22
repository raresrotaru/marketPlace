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
