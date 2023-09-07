let contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // start loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <div class="spinner-border text-light" role = "status" style = "width: 1rem; height: 1rem; margin: 0 13.71px;">
            <span class="visually-hidden">Loading...</span>
        </div>`

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/sendemail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            // alert('Success!');
            // show success message and stop loading
            submitBtn.style.backgroundColor = "#0F9D58";
            submitBtn.innerHTML = "Success!"
            setTimeout(() => {
                submitBtn.innerHTML = "Send"
                submitBtn.style.backgroundColor = "#4285F4";
                submitBtn.disabled = false;
            }, 5000);
            name.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
        } else {
            // alert('Something went wrong!');
            // show error message and stop loading
            submitBtn.style.backgroundColor = "#DB4437";
            submitBtn.innerHTML = "Failed!"
            setTimeout(() => {
                submitBtn.innerHTML = "Send"
                submitBtn.style.backgroundColor = "#4285F4";
                submitBtn.disabled = false;
            }, 5000);
        }
    }

    xhr.send(JSON.stringify(formData));
})

const scriptURL = 'https://script.google.com/macros/s/AKfycby1Ny0Mc6GFFu3R7ImUgZlJArqMHO-c_yuF3JKBnn9dJaQAvGIsK24dC_UR6OaAsFXp/exec'
const form = document.forms['submit-to-google-sheet']

try {
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                console.log('Success!', response);
            })
            .catch(error => {
                console.error('Error!', error.message);
            })
    })
} catch (err) {
    console.log(err)
}