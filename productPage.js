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

//Sticky navbar 

window.onscroll = function () { mySticky() };

var navbar = document.getElementById("navBar2");
var sticky = navbar.offsetTop;

function mySticky() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

//Load product on page

// console.log(`${localStorage.getItem("productObject")}`)

window.addEventListener("load", loadProduct)

function loadProduct() {
    const product = JSON.parse(`${localStorage.getItem("productObject")}`)
    const imageCarousel = document.getElementById("imageCarousel")
    imageCarousel.innerHTML = `<img src="${product.image2}" id="lastClone" alt="" style="width: 100%; height: 100%" /> <img src="${product.image}" alt="" style="width: 100%; height: 100%"/> <img src="${product.image2}" alt="" style="width: 100%; height: 100%"/> <img src="${product.image}" id="firstClone" alt="" style="width: 100%; height: 100%"/>`
    console.log(product)
}