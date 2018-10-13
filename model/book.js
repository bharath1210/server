'use strict'
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    ISBN:String,
    Author:String,
    Title:String,
    Year:String
})

const userBook = mongoose.model('userBook', userSchema);
module.exports = userBook;