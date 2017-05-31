const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});


router.get('/register', (req, res, next)=>{
    res.render('register', { title: 'Register' });
});



router.get('/login', (req, res, next)=>{
    res.render('login', { title: 'Login' });
});


module.exports = router;
