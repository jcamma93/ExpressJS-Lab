const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

const FORMSUBMISSIONS_PATH = path.join(__dirname, './formsubmissions.json')

app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/contact-form', (req, res) => {
//     console.log(req.body.email);
//     console.log(req.body.name);
//     res.send('Thank you for submitting your contact form.');
// });

// middleware logger
// app.use((req, res, next) => {
//    fs.appendFileSync('log.txt',`${req.url}\n`);
//    next();
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended:false }))

app.get('/formsubmissions', (req, res) => {
    fs.readFile(FORMSUBMISSIONS_PATH, (err, data) => {
        if(err) {
            res.json({ error: 'Something went wrong.' });
            return;
        }
        const formsubmissions = JSON.parse(data);
        res.json(formsubmissions);

       
        })
    })




// app.get('/order/:name', (req, res) => {
//     let name = req.params.name;
//     let email = req.query.email;
//     res.send(`Your name is ${name} and email is ${email}`);
// });


app.post('/contact-form', (req, res) => {
    fs.readFile(FORMSUBMISSIONS_PATH, (err, data) => {
        if(err) {
            res.json({ error: 'Something went wrong.' });
            return;
        }
        const formsubmissions = JSON.parse(data);
        formsubmissions.push(req.body);

        fs.writeFile(FORMSUBMISSIONS_PATH, JSON.stringify(formsubmissions), (err) => {
            if(err) {
                res.json({ error: 'Something went wrong.' });
                return;
            }
        res.json({ msg: 'Thank you for your submission!'})
        })
    })
})

app.listen(3000);