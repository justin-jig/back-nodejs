const express = require('express');
const app = express();
const PORT = 8000;
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extends:true}));
app.use(express.json());

/** 서버용 검증 secret 키 */
const secret = 'kdt';

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/verify', (req, res) => {
    console.log(req.headers.authorization);
    const auth = req.headers.authorization;
    const token = auth.split(' ');
    if (token[0] === 'Bearer') {
        const verify = jwt.verify(token[1], secret, (err, decoded) => {
            if (err) {
                return res.send(403).send({message:'검증 실패'})
            }
            res.send({user : decoded})
        });    
        console.log(verify);
    } else {
        res.send({message : '잘못된 인증방식입니다.'})
    }
})

app.post('/login',(req,res) => {
    const {id, pw} = req.body ;
    const token = jwt.sign({id}, secret);
    res.send (token);
})

app.listen(PORT,() => {
    console.log(`localhost:${PORT}`)
})