require("dotenv").config();
const express = require("express");
const sendEmail = require("./email_service");
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static('public'));
app.use(express.json());

// Routes
app.route("/").get((req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.route("/sendemail").post((req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;
        const userOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Google DSC BPPIMT : We will get back to you soon!",
            text: `Thank you for your response\n\nHere's what we received\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\nStay connected :)`,
        };
        const adminOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Google DSC BPPIMT : New Message`,
            text: `Response from ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        };
        sendEmail(userOptions);
        sendEmail(adminOptions);
        res.send('success');
    } catch (err) {
        res.status(500).json("Internal Server Error!");
    }
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT} at http://localhost:${PORT}`);
});