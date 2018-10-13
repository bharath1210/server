'use strict';

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 3000;
const jwt = require('jsonwebtoken');

const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const bookRoutes = require('./routes/book')
const server = require('./db');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(signupRoutes)
app.use(loginRoutes)
app.use((req, res, next) => {
    const token = (req.headers.Authorization || req.headers.authorization || '').split('Bearer ').pop();
    console.log(token)
    jwt.verify(token, 'bkn', (err, decoded) => {
        if(err) {
            console.log('hiiii')
            return res.status(400).json(err)
        }
        console.log("hi", token);
        next()
    })
   
})




app.use('', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server Started At port ${PORT}`)
})