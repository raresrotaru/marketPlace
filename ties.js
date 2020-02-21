const toTopBtn = document.getElementById("goTopBtn");

window.addEventListener("scroll", scrollFunction);
toTopBtn.addEventListener("click", backToTop)

function scrollFunction() {
    if (window.pageYOffset > 200) {
        if (!toTopBtn.classList.contains("btnEntrance")) {
            toTopBtn.classList.remove("btnExit");
            toTopBtn.classList.add("btnEntrance");
            toTopBtn.style.display = "block";
        }
    } else {
        if (toTopBtn.classList.contains("btnEntrance")) {
            toTopBtn.classList.remove("btnEntrance");
            toTopBtn.classList.add("btnExit");
            setTimeout(function () {
                toTopBtn.style.display = "none";
            }, 250);
        }
    }
}

function backToTop() {
    window.scrollTo(0, 0);
}

fetch("http://localhost:3000/api/ties", {
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
})
  .then(r => r.json())
  .then(content =>{
      console.log(content);
      document.getElementById("ctn").innerHTML = content[0];
      // document.getElementById("content").innerText;
})

function addProducts() {
    const mainContainer = document.getElementById("mainContainer");
    const card = mainContainer.appendChild(document.createElement("div"));
    card.classList = "products";
    const image = card.appendChild(document.createElement("img"));
    image.setAttribute("src", tieList[0].image);
    image.classList = "images";
    const productName = card.appendChild(document.createElement("h3"));
    productName.innerHTML = tieList[0].name;
    const productDescription = card.appendChild(document.createElement("p"));
    productDescription.innerHTML = tieList[0].description;
    const productPrice = card.appendChild()
    console.log(card);
}

addProducts();