var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

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

function printStringByLetter(paragraph_id, myDiv_id) {
    var myDiv = document.getElementById(myDiv_id);
    var text = document.getElementById(paragraph_id).innerHTML;
    // myDiv.innerHTML = "";
    document.getElementById(myDiv_id).innerHTML = "";
    // console.log(text.length);
    var index = 0;
    var intervalId = setInterval(function () {
        myDiv.innerHTML += text.charAt(index);
        index++;
        // console.log(index);
        if (index == text.length) {
            clearInterval(intervalId);
            index = 0;
            text = "";
        }
    }, 50);
}

function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
}