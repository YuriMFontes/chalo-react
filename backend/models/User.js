const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: {
        type: String,
        default: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
