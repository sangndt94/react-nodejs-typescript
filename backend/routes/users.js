const router = require('express').Router();
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken")

const tranporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}))

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error:" + err))
});
router.route('/add').post((req, res) => {
    const { firstName, lastName, email, password } = req.body;
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!re.test(email)) {
        return res.json("Please fill a valid email address")
    }

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" })
        }
        const token = jwt.sign({ firstName, lastName, email, password }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m' })

        const newUser = new User({ firstName, lastName, password, email })
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return tranporter.sendMail({
                to: email,
                from: 'hao.pham@kms-solutions.asia',
                subject: "Signup Success",
                // html: '<h1>You successfully signed up ! </h1>',
                html: `
                 <h2>Please click on given link to activate your account</h2>
                 <a href="${process.env.CLIENT_URL}/authentication/activate/${token}">${process.env.CLIENT_URL}/authentication/activate/${token}</a>
                `
            })
            // return res.json("Signup success")
        })

    })

});

module.exports = router