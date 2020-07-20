const router = require('express').Router();
const User = require('../models/user.model');

const jwt = require("jsonwebtoken")
const mailgun = require("mailgun-js");

const DOMAIN = 'sandboxfebf8edfd9d548db9164906d87a921bc.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error:" + err))
});


// router.route('/add').post((req, res) => {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const password = req.body.password;
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     if(!re.test(email)){
//         return res.json("Please fill a valid email address")
//     }

//     User.findOne({ email }).then(response => {
//         if (response.length === 0) {
//             const newUser = new User({ firstName, lastName, password, email })
//             newUser.save()
//                 .then(() => res.json("User added"))
//                 .catch(err => res.status(400).json("Error:" + err))
//         } else {
//             return res.json("user exist")
//         }
//     })

// });
router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!re.test(email)) {
        return res.json("Please fill a valid email address")
    }

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" })
        }
        const token = jwt.sign({ firstName, lastName, email, password }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m' })
        const data = {
            from: 'noreply@hello.com',
            to: email,
            subject: 'Account Activation Link',
            html:`
                <h2>Please click on given link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
            `
            // text: 'Testing some Mailgun awesomness!'
        };

        mg.messages().send(data, function (error, body) {
            if (error) {
                return res.json({ error: err.message})
            }
            return res.json({ message: 'Email has been sent, kindly activate your account' })
        });

        // const newUser = new User({ firstName, lastName, password, email })
        // newUser.save((err, success) => {
        //     if (err) {
        //         return res.status(400).json({ error: err })
        //     }
        //     return res.json("Signup success")
        // })

    })

});

module.exports = router