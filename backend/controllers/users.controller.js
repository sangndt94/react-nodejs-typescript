const router = require('express').Router({mergeParams: true});
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
router.route('/sign-up').post((req, res) => {
    const { firstName, lastName, email, password } = req.body;
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!re.test(email)) {
        return res.json("Please fill a valid email address")
    }

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" })
        }

        const newUser = new User({ firstName, lastName, password, email })
        newUser.save((err, data) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            // const token = jwt.sign({ firstName, lastName, email, password }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m' })
            return res.json({ data })
            // return tranporter.sendMail({
            //     to: email,
            //     from: 'hao.pham@kms-solutions.asia',
            //     subject: "Signup Success",
            //     // html: '<h1>You successfully signed up ! </h1>',
            //     html: `
            //      <h2>Please click on given link to activate your account</h2>
            //      <a href="${process.env.CLIENT_URL}/authentication/activate/${token}">${process.env.CLIENT_URL}/authentication/activate/${token}</a>
            //     `
            // })
        })
    })
});


router.route('/sign-in').post((req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password }).exec((err, user) => {
        if (!user) {
            return res.status(400).json({ error: err })
        }
        const token = jwt.sign({ email, password }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m' })
        return res.json({ user, token })
    })
    // const { token } = req.body;
    // if (token) {
    //     jwt.verify(token, process.env.JWT_ACC_ACTIVATE, (err, decodedToken) => {
    //         if (err) {
    //             return res.status(400).json({ error: "Incorrect or Expired link." })
    //         }
    //         const { firstName, lastName, password, email } = decodedToken;
    //         return res.json({ firstName, lastName, password, email })
    //         // User.findOne({ email }).exec((err, user) => {
    //         //     if (err) {
    //         //         return res.status(400).json({ error: "User with this email already exists." })
    //         //     }
    //         //     const newUser = new User({ firstName, lastName, password, email })
    //         //     newUser.save((err, success) => {
    //         //         if (err) {
    //         //             console.log("Error in signup while account activation: ", err)
    //         //             return res.status(400).json({ error: err })
    //         //         }
    //         //     })
    //         // })
    //     })
    // }
    // return res.json({ error: "Something went wrong !!!" })
})

module.exports = router