const router = require('express').Router();

router.use('/users', require("../controllers/users.controller"))

module.exports = router