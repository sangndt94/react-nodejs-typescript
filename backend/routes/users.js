const router = require('express').Router();
const User = require('../models/user.model');
const { response } = require('express');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error:" + err))
});


router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!re.test(email)){
        return res.json("Please fill a valid email address")
    }

    User.find({ email }).then(response => {
        if (response.length === 0) {
            const newUser = new User({ firstName, lastName, password, email })
            newUser.save()
                .then(() => res.json("User added"))
                .catch(err => res.status(400).json("Error:" + err))
        } else {
            return res.json("user exist")
        }
    })

});

module.exports = router