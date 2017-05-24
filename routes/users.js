const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');




//Register
router.post('/register', (req, res, next)=>{
    console.log('register user');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user)=>{
        if (err){
            console.log('Error');
            res.json({success: false, msg: 'Failed to register user'});
        } else{
            console.log('User was inserted correctly');
            res.json({success: true, msg: 'User registered'});
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;

/*
 // GET users listing.
 router.get('/', (req, res, next)=> {
 res.send('respond with a resource');
 });
*/