'use strict'
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    emailVerified: Boolean,
    otp: String,
    googleId: String

})

const User = mongoose.model('User', userSchema);
module.exports = User;