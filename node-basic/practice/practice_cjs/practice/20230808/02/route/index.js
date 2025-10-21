const express = require('express');
const router = express.Router(); 

const userRote = require('./user');

router.get('/', (req, res) => {
    res.render('index');
})

/* localhost:PROT/user
 * user rotue
*/
userRote.userRote(router);


//* 맨 마지막에 선언
router.use( '*' , (req,res) => {
    res.render('404');
})
module.exports = router;