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

//Load product on page

window.addEventListener("load", loadProduct)
window.addEventListener('load', addItemWishlist)
window.addEventListener('load', addItemCart)




function loadProduct() {
    const product = JSON.parse(sessionStorage.getItem("productObject"))
    console.log(sessionStorage)
    const imageCarousel = document.getElementById("imageCarousel")
    const firstImage = document.getElementById("firstImage")
    const secondImage = document.getElementById("secondImage")
    const mainInformation = document.getElementById("mainInformation")
    const productDetailsContainer = document.getElementById("productDetailsContainer")
    const firstSmallImage = firstImage.appendChild(document.createElement("img"))
    const secondSmallImage = secondImage.appendChild(document.createElement("img"))
    firstSmallImage.setAttribute("src", `${product.image}`)
    secondSmallImage.setAttribute("src", `${product.image2}`)
    imageCarousel.innerHTML = `<img src="${product.image2}" id="lastClone" alt="" style="width: 400px" /> <img src="${product.image}" alt="" style="width: 400px"/>  <img src="${product.image2}" alt="" style="width: 400px"/> <img src="${product.image}" id="firstClone" alt="" style="width: 400px"/>`
    mainInformation.innerHTML = `<div id="namePrice"><h1>${product.name}</h1> <h5>${product.info.brand}® by Tiesnsocks.com</h5><h2>${product.price}</h2><p>FREE SHIPPING & RETURNS*</p></div><div id="buttons"><button id="addToCart">ADD TO CART</button><button id="addToWishlist">ADD TO WISHLIST</button></div><p id="description">${product.description}</p>`
    productDetailsContainer.innerHTML = `<hr><h2 id="title">About the product</h2><div id="productDetails"><p><b>Product Code: </b>${product.info.listingNumber}</p><p><b>Name: </b>${product.name}</p><p><b>Product: </b>${product.productType}</p><p><b>Color: </b>${product.info.color}</p><p><b>Brand: </b>${product.info.brand}</p><p><b>Material: </b>${product.info.material}</p><p><b>Size: </b>${product.info.size}</p><p><b>Form: </b>${product.info.form}</p></div>`
}


window.addEventListener("load", carouselFunction)

function carouselFunction() {
    const carouselSlide = document.querySelector("#imageCarousel");
    const carouselImages = document.querySelectorAll("#imageCarousel img");

    //Buttons
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");

    //Counter
    let counter = 1;
    const size = 400;
    // console.log(carouselImages[0].clientWidth)

    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";

    //Button listeners

    function next() {
        if (counter >= carouselImages.length - 1) return;
        carouselSlide.style.transition = "transform 0.7s ease-in-out"
        counter++;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }

    nextBtn.addEventListener("click", next);


    prevBtn.addEventListener("click", () => {
        if (counter <= 0) return;
        carouselSlide.style.transition = "transform 0.7s ease-in-out"
        counter--;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    })

    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter].id === "lastClone") {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - 2;
            carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
        }
        if (carouselImages[counter].id === "firstClone") {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - counter;
            carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
        }
    })
}

function addItemWishlist() {
    const wishlistBtn = document.getElementById("addToWishlist")
    const wishlistContainer = document.getElementById("wishlistContainer")
    const addToWishlistAlert = document.getElementById("addToWishlistAlert")
    function wishlistAlert() {
        addToWishlistAlert.style.display = "flex";
        setTimeout(function stopAlert() {
            addToWishlistAlert.style.display = "none"
        }, 750)
    }
    wishlistBtn.addEventListener('click', function (e) {
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
        const content = JSON.parse(sessionStorage.getItem("productObject"))
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
            console.log(e.target.parentNode)
            if (wishlistContainer.lastElementChild.innerHTML === 'You have no favorite products!') {
                wishlistText.style.display = "initial"
            }
            console.log(wishlistContainer.lastElementChild.innerHTML)
        }
    })
}

function addItemCart() {
    const cartBtn = document.getElementById("addToCart")
    const cartContainer = document.getElementById("cartContainer")
    const addToCartAlert = document.getElementById("addToCartAlert")
    var productQty = 0;
    function cartAlert() {
        addToCartAlert.style.display = "flex";
        setTimeout(function stopAlert() {
            addToCartAlert.style.display = "none"
        }, 750)
    }
    cartBtn.addEventListener('click', function (e) {
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
        const content = JSON.parse(sessionStorage.getItem("productObject"))
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
}