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

function loadProduct() {
    const product = JSON.parse(localStorage.getItem("productObject"))
    const imageCarousel = document.getElementById("imageCarousel")
    imageCarousel.innerHTML = `<img src="${product.image2}" id="lastClone" alt="" style="width: 400px" /> <img src="${product.image}" alt="" style="width: 400px"/>  <img src="${product.image2}" alt="" style="width: 400px"/> <img src="${product.image}" id="firstClone" alt="" style="width: 400px"/>`
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

