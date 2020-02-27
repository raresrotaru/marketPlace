fetch("http://localhost:3000/api/accessories", {
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
})
  .then(r => r.json())
  .then(content => {
    const mainContainer = document.getElementById("mainContainer");
    for (var i = 0; i < content.length; i++) {
      const card = mainContainer.appendChild(document.createElement("div"));
      card.classList = "products";
      const image = card.appendChild(document.createElement("img"));
      image.setAttribute("src", content[i].image);
      image.classList = "images";
      const productName = card.appendChild(document.createElement("h3"));
      productName.innerHTML = content[i].name;
      const productPrice = card.appendChild(document.createElement("h4"));
      productPrice.innerHTML = content[i].price;
      const addToCart = card.appendChild(document.createElement("button"));
      addToCart.classList = "addToCartBtn";
      addToCart.innerHTML = "Add To Cart";
      const addToWishlist = card.appendChild(document.createElement("button"));
      addToWishlist.classList = "addToWishlistBtn";
      addToWishlist.innerHTML = "Add To Wishlist";
    }
  })
  .catch(err => {
    const errorContainer = document.createElement("div")
    const errorTitle = document.createElement("h1")
    const errorDescription = document.createElement("p")
    errorContainer.appendChild(errorTitle)
    errorContainer.appendChild(errorDescription)
    errorContainer.classList = "errorContainer"
    errorTitle.classList = "errorTitle"
    errorDescription.classList = "errorDescription"
    errorTitle.innerHTML = "403"
    errorDescription.innerHTML = "This is a forbidden area"
    const footer = document.getElementById("footer")
    footer.parentNode.insertBefore(errorContainer, footer)
  })


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