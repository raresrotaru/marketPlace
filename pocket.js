fetch("http://localhost:3000/api/pocket", {
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
})
  .then(r => r.json())
  .then(content => {
    const mainContainer = document.getElementById("mainContainer");
    for (var i = 0; i < content.length; i++) {
      const card = mainContainer.appendChild(document.createElement("div"));
      const productPageLink = card.appendChild(document.createElement("a"));
      const image = productPageLink.appendChild(document.createElement("img"));
      const productName = productPageLink.appendChild(document.createElement("h3"));
      const productPrice = productPageLink.appendChild(document.createElement("h4"));
      const addToCart = card.appendChild(document.createElement("button"));
      const addToWishlist = card.appendChild(document.createElement("button"));
      productPageLink.setAttribute("href", "productPage.html");
      image.setAttribute("src", content[i].image);
      card.classList = "products";
      image.classList = "images";
      productName.classList = "productName";
      productPrice.classList = "productPrice";
      addToCart.classList = "addToCartBtn";
      addToWishlist.classList = "addToWishlistBtn";
      productName.innerHTML = content[i].name; 
      productPrice.innerHTML = content[i].price;
      addToCart.innerHTML = "Add To Cart";
      addToWishlist.innerHTML = "Add To Wishlist";
    }
  })
  .catch(err => {
    const errorContainer = document.createElement("div");
    const errorTitle = document.createElement("h1");
    const errorDescription = document.createElement("p");
    const footer = document.getElementById("footer");
    errorContainer.appendChild(errorTitle);
    errorContainer.appendChild(errorDescription);
    footer.parentNode.insertBefore(errorContainer, footer);
    errorContainer.classList = "errorContainer";
    errorTitle.classList = "errorTitle";
    errorDescription.classList = "errorDescription";
    errorTitle.innerHTML = "403";
    errorDescription.innerHTML = "This is a forbidden area";
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

