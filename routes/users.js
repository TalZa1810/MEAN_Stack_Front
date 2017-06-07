const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

//Register
router.post('/register', (req, res, next)=>{
    console.log('register user');
    const { name, email, username, password } = req.body;

    let newUser = new User({
        name,
        email,
        username,
        password
    });

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user) {
            res.json({success: false, msg: 'User exists'});
        }
        else{
            User.addUser(newUser, (err, user)=>{
                if (err){
                    console.log('Error');
                    res.json({success: false, msg: 'Failed to register user'});

                } else{
                    console.log('User was inserted correctly');
                    req.session.user = user;
                    req.session.save();
                    return res.status(200).send({success: true, msg: 'User was inserted correctly'});
                }
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                req.session.user = user;
                req.session.save();

                return res.status(200).send({
                         success: true,
                         msg: 'User Login',
                         token: 'JWT ' + token,
                         user: {
                             id: user._id,
                             name: user.name,
                             username: user.username,
                             email: user.email
                         }
                     });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});


// Profile
// the second parameter is in order to protect the route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;