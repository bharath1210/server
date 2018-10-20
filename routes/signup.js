'use strict'
const nodemailer = require('nodemailer');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');


 function OTP(){return ((Math.random()*Date.now()*10000).toFixed(0))};

 let otp = OTP();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'bharathbk1210@gmail.com',
        pass: 'bharath94'
    }
})

var mailOptions = {
    from: 'bharathbk1210@gmail.com',
    to: 'bharathkrishnan10@gmail.com',
    subject: 'Hello',
    text: 'Hello buddy',
    html: ` <a href="http://localhost:3000/account/verify/${otp}">click me to verify:</a>`
};

function sendMail() {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
        transporter.close()
        
    })
    return ('hii');
}




router.post('/signup', (req, res) => {
    let data = req.body; 
     data.otp = otp;
     data.emailVerified = false;
    const username = req.body.username;
    const saltRound = 10;
    let bcyptPassword = data.password;

    User.findOne({ username }) 
        .then((doc) => { 
            if (!doc) {
                return bcrypt.hash(bcyptPassword, saltRound);
            }
            throw new Error ('same username');

        })
        .then((hash) => {
            data.password = hash;
            const user = new User(data);
             const a = sendMail();
             console.log(a)
            return user.save()
        })
        .then((userData) => {
            res.status(200).json(userData)
        })
        .catch(error => {
            
            res.status(400).json({error: error.message})
        })

})

/**
 * email verification
 */

 router.get(`/account/verify/${otp}`, (req, res) => {
     let id = (req.url);
     id = id.split('/')
     id= id[3]
     let emailVerified = true;
     console.log(id)
     console.log(req.get, emailVerified)
     User.findOneAndUpdate({'otp':id},{$set:{emailVerified:`${emailVerified}`}})
     .then((result)=>{
        res.status(200).json(result)
    })
    .catch(error =>{
        res.status(400).json(error)
    })
 })

module.exports = router;