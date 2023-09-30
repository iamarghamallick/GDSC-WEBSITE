let contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let submitBtn = document.getElementById('submit-btn');

const hostURL = "https://gdsc-bppimt.onrender.com";

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
    xhr.open('POST', `${hostURL}/sendemail`);
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

const scriptURL = 'https://script.google.com/macros/s/AKfycbyjL4LAGK6b0DubgLiXY7Rm3zUAlNYZf3PdBmLG6tp4YqMB40zSKP_g4J2aShnR7dB5/exec'
const form = document.forms['submit-to-google-sheet']

try {
    form.addEventListener('submit', e => {
        e.preventDefault()

        // Get the current time
        const currentTime = new Date().toLocaleString();

        // Create a new FormData object
        const formData = new FormData(form);

        // Add the current time to the FormData object
        formData.append('time', currentTime);

        fetch(scriptURL, { method: 'POST', body: formData })
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