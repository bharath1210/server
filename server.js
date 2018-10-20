'use strict';

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 3000;
const jwt = require('jsonwebtoken');
const server = require('./db');


const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const bookRoutes = require('./routes/book');
const googleLoginRoutes = require('./routes/google-login');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(signupRoutes);
app.use(loginRoutes);
app.use('/google', googleLoginRoutes);
app.use((req, res, next) => {
    const token = (req.headers.Authorization || req.headers.authorization || '').split('Bearer ').pop();
    jwt.verify(token, 'bkn', (err, decoded) => {
        if (err) {
            return res.status(400).json(err)
        }
        next()
    })

})


app.use(bookRoutes)

app.listen(PORT, () => {
    console.log(`Server Started At port ${PORT}`)
})