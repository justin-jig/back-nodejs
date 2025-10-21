import express from 'express';
import { userRote } from './user.js';

const router = express.Router(); 
router.get('/', (req, res) => {
    res.render('index');
})

/* localhost:PROT/user
 * user rotue
*/

userRote(router);


//* 맨 마지막에 선언
router.use( '*' , (req,res) => {
    res.render('404');
})


export default router;