const express = require('express');
const path = require('path');
// const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact-form', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.name);
    res.send('Thank you for submitting your contact form.');
});

// middleware logger
// app.use((req, res, next) => {
//    fs.appendFileSync('log.txt',`${req.url}\n`);
//    next();
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(express.static(path.join(__dirname, '../public')));



app.get('/order/:name', (req, res) => {
    let name = req.params.name;
    let email = req.query.email;
    res.send(`Your name is ${name} and email is ${email}`);
});

app.listen(3000);