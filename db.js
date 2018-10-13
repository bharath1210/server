'use strict'
const mongoose = require('mongoose');

 const db = mongoose.connect('mongodb://localhost/material', { useNewUrlParser: true })
    .then(() => console.log('connected to database'))
    .catch((error) => console.log(err.message));
