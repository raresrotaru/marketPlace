fetch("http://localhost:3000/api/ties", {
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
      productPageLink.setAttribute("id", content[i].id);
      productPageLink.classList = "product";
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
toTopBtn.addEventListener("click", backToTop);

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

window.addEventListener('load', loadProduct)
window.addEventListener('load', addItemWishlist)
window.addEventListener('load', addItemCart)

// sessionStorage.removeItem("productObject")

function loadProduct() {
  const product = document.getElementsByClassName("product")
  for (var i = 0; i < product.length; i++) {
    product[i].addEventListener("click", getProduct)
    function getProduct(e) {
      fetch(`http://localhost:3000/api/ties/${e.target.parentNode.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      })
        .then(r => r.json())
        .then(content => {
          sessionStorage.setItem("productObject", JSON.stringify(content))
        })
    }
  }
}


function addItemWishlist() {
  const wishlistBtn = document.getElementsByClassName("addToWishlistBtn")
  const wishlistContainer = document.getElementById("wishlistContainer")
  const addToWishlistAlert = document.getElementById("addToWishlistAlert")
  function wishlistAlert() {
    addToWishlistAlert.style.display = "flex";
    setTimeout(function stopAlert() {
      addToWishlistAlert.style.display = "none"
    }, 750)
  }
  for (var i = 0; i < wishlistBtn.length; i++) {
    wishlistBtn[i].addEventListener('click', function (e) {
      wishlistAlert()
      const productContainer = wishlistContainer.appendChild(document.createElement("div"))
      const productImage = productContainer.appendChild(document.createElement("img"))
      const wishlistText = document.getElementById("wishlistText")
      const informationContainer = productContainer.appendChild(document.createElement("div"))
      const productName = informationContainer.appendChild(document.createElement("h3"))
      const priceAndRemove = productContainer.appendChild(document.createElement("div"))
      const productPrice = priceAndRemove.appendChild(document.createElement("h3"))
      const productBrand = informationContainer.appendChild(document.createElement("p"))
      const productColor = informationContainer.appendChild(document.createElement("p"))
      const productMaterial = informationContainer.appendChild(document.createElement("p"))
      const removeItemBtn = priceAndRemove.appendChild(document.createElement("button"))
      priceAndRemove.classList = "priceAndRemove"
      removeItemBtn.classList = "removeItemBtn"
      informationContainer.classList = "informationContainer"
      wishlistText.style.display = "none"
      productContainer.classList = "productContainer"
      fetch(`http://localhost:3000/api/ties/${e.target.previousSibling.previousSibling.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      })
        .then(r => r.json())
        .then(content => {
          productImage.setAttribute("src", `${content.image}`)
          productName.innerHTML = `${content.name}`
          productPrice.innerHTML = `${content.price}`
          productBrand.innerHTML = `Brand: ${content.info.brand}`
          productColor.innerHTML = `Color: ${content.info.color}`
          productMaterial.innerHTML = `Material: ${content.info.material}`
          removeItemBtn.innerHTML = "X";
          removeItemBtn.addEventListener('click', removeItem)
          function removeItem(e) {
            e.target.parentNode.parentNode.remove()
            if (wishlistContainer.lastElementChild.innerHTML === 'You have no favorite products!') {
              wishlistText.style.display = "initial"
            }
            console.log(wishlistContainer.lastElementChild.innerHTML)
          }
        })
    })
  }
}

function addItemCart() {
  const cartBtn = document.getElementsByClassName("addToCartBtn")
  const cartContainer = document.getElementById("cartContainer")
  const addToCartAlert = document.getElementById("addToCartAlert")
  var productQty = 0;
  function cartAlert() {
    addToCartAlert.style.display = "flex";
    setTimeout(function stopAlert() {
      addToCartAlert.style.display = "none"
    }, 750)
  }
  for (var i = 0; i < cartBtn.length; i++) {
    cartBtn[i].addEventListener('click', function (e) {
      cartAlert()
      const totalContainer = document.getElementById("totalContainer")
      const productContainer = document.createElement("div")
      cartContainer.insertBefore(productContainer, totalContainer)
      const productImage = productContainer.appendChild(document.createElement("img"))
      const cartText = document.getElementById("cartText")
      const informationContainer = productContainer.appendChild(document.createElement("div"))
      const productName = informationContainer.appendChild(document.createElement("h3"))
      const priceAndRemove = productContainer.appendChild(document.createElement("div"))
      const productPrice = priceAndRemove.appendChild(document.createElement("h3"))
      const productBrand = informationContainer.appendChild(document.createElement("p"))
      const productColor = informationContainer.appendChild(document.createElement("p"))
      const productMaterial = informationContainer.appendChild(document.createElement("p"))
      const removeItemBtn = priceAndRemove.appendChild(document.createElement("button"))
      const qtyContainer = priceAndRemove.appendChild(document.createElement("div"))
      const addQtyBtn = qtyContainer.appendChild(document.createElement("button"))
      const qtyText = qtyContainer.appendChild(document.createElement("p"))
      const removeQtyBtn = qtyContainer.appendChild(document.createElement("button"))
      const totalQty = document.getElementById("totalQty");
      const totalPrice = document.getElementById("totalPrice");
      var qtyTextValue = 1;
      qtyText.innerHTML = qtyTextValue;
      addQtyBtn.innerHTML = "+"
      removeQtyBtn.innerHTML = "-"
      removeQtyBtn.setAttribute("id", "removeQty")
      addQtyBtn.setAttribute("id", "addQty")
      qtyContainer.setAttribute("id", "qtyContainer")
      priceAndRemove.classList = "priceAndRemove"
      removeItemBtn.classList = "removeItemBtn"
      informationContainer.classList = "informationContainer"
      productContainer.classList = "productContainer"
      fetch(`http://localhost:3000/api/ties/${e.target.previousSibling.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      })
        .then(r => r.json())
        .then(content => {
          productImage.setAttribute("src", `${content.image}`)
          productName.innerHTML = `${content.name}`
          productPrice.innerHTML = `${content.price}`
          productBrand.innerHTML = `Brand: ${content.info.brand}`
          productColor.innerHTML = `Color: ${content.info.color}`
          productMaterial.innerHTML = `Material: ${content.info.material}`
          removeItemBtn.innerHTML = "X";
          removeItemBtn.addEventListener('click', removeItem)
          const numberOfProducts = document.getElementById("numberOfProducts")
          const price = content.price.replace("$", "").replace(/,/g, "")
          productQty++;
          totalQty.innerHTML = productQty;
          numberOfProducts.innerHTML = productQty
          totalPrice.innerHTML = (Number(totalPrice.innerHTML) + Number(price)).toFixed(2);
          addQtyBtn.addEventListener("click", function () {
            qtyTextValue++;
            qtyText.innerHTML = qtyTextValue;
            totalQty.innerHTML++;
            totalPrice.innerHTML = (Number(totalPrice.innerHTML) + Number(price)).toFixed(2)
          })
          removeQtyBtn.addEventListener("click", function () {
            if (qtyTextValue > 1) {
              qtyTextValue--;
              qtyText.innerHTML = qtyTextValue;
              totalQty.innerHTML--;
              totalPrice.innerHTML = (Number(totalPrice.innerHTML) - Number(price)).toFixed(2)
            } else {
              return;
            }
          })
          function removeItem(e) {
            e.target.parentNode.parentNode.remove()
            productQty--;
            numberOfProducts.innerHTML = productQty
            totalQty.innerHTML -= qtyText.innerHTML
            totalPrice.innerHTML = (Number(totalPrice.innerHTML) - (Number(qtyText.innerHTML) * Number(price))).toFixed(2)
            qtyText.innerHTML = productQty
          }
        })
    })
  }
}

