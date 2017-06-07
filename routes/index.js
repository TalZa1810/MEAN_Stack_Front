const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: "Express" , activeUser: req.session.user });
});

router.get('/register', (req, res, next)=>{
    res.render('register', { title: 'Register' });
});

router.get('/login', (req, res, next)=>{
    res.render('login', { title: 'Login' });
});

router.get('/welcome', (req, res, next)=>{
    res.render('welcome', { title: 'welcome' });
});




module.exports = router;
