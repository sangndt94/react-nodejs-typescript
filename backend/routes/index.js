const userController =  require("./users") ;

module.exports = function (app) {
    app.use('/api/users',userController)
}