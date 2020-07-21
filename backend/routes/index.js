const userController =  require("../controllers/users") ;

module.exports = function (app) {
    app.use('/api/users',userController)
}