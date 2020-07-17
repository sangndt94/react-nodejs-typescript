const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    // firstName: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     minlength: 3
    // },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    activated: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User