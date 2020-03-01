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

const product = JSON.parse(localStorage.getItem("productObject"))

function loadProduct() {
    const imageCarousel = document.getElementById("imageCarousel")
    const firstImage = document.getElementById("firstImage")
    const secondImage = document.getElementById("secondImage")
    const mainInformation = document.getElementById("mainInformation")
    firstImage.innerHTML = `<img src="${product.image}" alt="" style="width: 100%; height:100%";/>`
    secondImage.innerHTML = `<img src="${product.image2}" alt="" style="width: 100%; height:100%"/>`
    imageCarousel.innerHTML = `<img src="${product.image2}" id="lastClone" alt="" style="width: 400px" /> <img src="${product.image}" alt="" style="width: 400px"/>  <img src="${product.image2}" alt="" style="width: 400px"/> <img src="${product.image}" id="firstClone" alt="" style="width: 400px"/>`
    mainInformation.innerHTML = `<h1>${product.name}</h1> <h5>${product.info.brand}® by Tiesnsocks.com</h5><h2>${product.price}</h2><p>FREE SHIPPING & RETURNS*</p><button id="addToCart">ADD TO CART</button><button id="addToWishlist">ADD TO WISHLIST</button><div id="qty"><button id="remove">-</button><span><p>Quantity: </p><p>1</p></span><button id="add">+</button></div><p id="description">${product.description}</p>`
    console.log(product)
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

