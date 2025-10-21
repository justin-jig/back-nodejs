import express from 'express';
import UserRote from './use.route.js';

const router = express.Router(); 
router.get('/', (req, res) => {
    res.render('index');
})

UserRote(router);


//* 맨 마지막에 선언
router.use( '*' , (req,res) => {
    res.render('404');
})


export default router;