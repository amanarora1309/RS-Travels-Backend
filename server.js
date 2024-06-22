const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// SMTP transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rstravelsagra@gmail.com',
        pass: 'blen jaij atkv hqxg'
    }
});

// API endpoint to send emails
app.post('/send-email', (req, res) => {
    const { name, email, phone, pickupAddress, dropoffAddress, price } = req.body;
    console.log(name)
    console.log(name)
    const fixedRecipient = 'amanarora2242@gmail.com';
    const mailOptions = {
        from: 'rstravelsagra@gmail.com',
        to: [...email, fixedRecipient].join(', '),
        subject: 'Travel Details',
        html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Pick-up Address:</strong> ${pickupAddress}</p>
      <p><strong>Drop-off Address:</strong> ${dropoffAddress}</p>
      <p><strong>Total Payment:</strong> ${price}</p>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ success: true, message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});