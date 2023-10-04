// img gallery loop
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// lazy-loading feature
const blurDivs = document.querySelectorAll(".blur-load");
blurDivs.forEach(div => {
    const img = div.querySelector("img");
    function loaded() {
        // show image
        div.classList.add("loaded");
    }

    if (img.complete) {
        loaded();
    } else {
        img.addEventListener("load", loaded);
    }
})

// faq section
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
            // clearBox('myDiv_id1')
        } else {
            panel.style.display = "block";
            let firstElementChild = panel.children[0].id;
            let secondElementChild = panel.children[1].id;
            // console.log(firstElementChild);
            // console.log(secondElementChild);
            printStringByLetter(secondElementChild, firstElementChild);
        }
    });
}
var images = document.querySelectorAll(".faq-icon");
images.forEach(function (image) {
    image.addEventListener("click", changeImage);
});

function changeImage() {
    if (this.src.match("chevron-down")) {
        this.src = "https://cdn.jsdelivr.net/gh/linuxguist/faqa@main/chevron-up.svg";
    } else {
        this.src = "https://cdn.jsdelivr.net/gh/linuxguist/faqa@main/chevron-down.svg";
    }
}

function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

let accordianHead = Array.from(document.querySelectorAll(".accordian_head"));

accordianHead.map((item) =>
    item.addEventListener("click", () => {
        closeAllAccordian(item);
    })
);

function closeAllAccordian(current_target) {
    console.log(current_target);
    accordianHead.map((item) => {
        if (current_target !== item) {
            const accordianBody = item.nextElementSibling;
            const togglerBtn = item.firstElementChild;
            togglerBtn.classList.remove("active");
            accordianBody.classList.remove("active_body");
        } else {
            const accordianBody = current_target.nextElementSibling;
            const togglerBtn = item.firstElementChild;
            togglerBtn.classList.toggle("active");
            accordianBody.classList.toggle("active_body");
        }
    });
}

// hide preloader on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.animation = "fade-out ease-out 0.5s";
    }, 2500);
    setTimeout(() => {
        document.querySelector('.preloader').style.display = "none";
        document.body.style.height = "unset";
        document.body.style.overflow = "unset";
    }, 3000);
})