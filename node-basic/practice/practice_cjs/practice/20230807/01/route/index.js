const express = require('express');
const router = express.Router(); 
const userController = require('../controller/user.crl');

// express get 함수
router.get('/', (req, res) => {
    res.render('form', {title :'axios로 로그인'});
})
// express post 함수
router.post('/login', userController.login);

module.exports = router;