const router = require('express').Router();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../model/user');
const jwt = require('jsonwebtoken');


// token generation

function tokenServ(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
        jwt.sign(data, 'bkn', { expiresIn: 500 * 60 }, (error, token) => {
            if (error) {
                reject(error)
            }
            else {
                console.log(token)
                resolve(token)
            }
        })
    })
}



passport.use(new googleStrategy({
    clientID: '82651457090-bsqv7gh0cqoqe5sufjc8a9b05f5v6lro.apps.googleusercontent.com',
    clientSecret: '0zuUOnyRt9aTvDzSk3LBMR9y',
    callbackURL: 'http://localhost:3000/google/callback'
},
    async (access, refresh, profile, cb) => {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            let userProfile = new User({ email, googleId })
            userProfile = await userProfile.save();
            const token = await tokenServ({ email: email })
            return cb(null, token)

        }

        let token = await tokenServ({ email: email })

        return cb(null, token)


    }
))






router.route('/')
    .get(
        passport.authenticate('google', { session: false, scope: ['email'] }))



router.route('/callback')
    .get(async (req, res, next) => {
        passport.authenticate('google', { session: false }, (err, token) => {
            if (token) {
                const resData = `
                <!DOCTYPE html><html><head></head><body>
                <mark>${token}</mark>
                <script>
                var token = "${token}";
                localStorage.setItem('tokenId', token);
                location.href = 'http://localhost:4200/assets/set-token.html';
                </script>
                </body></html>`;

                res.send(resData)
            } else {
                res.send('Sorry invalid login !')
            }

        })(req, res, next)
    })


module.exports = router;