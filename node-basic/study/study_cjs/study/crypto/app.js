const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let pass = '';
const salt = crypto.randomBytes(16).toString('hex'); // 솔트 생성
const lengt = 1000; // 반복 횟수
const key = 64; // 생성할 키의 길이
const algo = 'sha512' // 알고리즘


app.post('/login', (req, res) => {
    const { pw } = req.body;
    // createHash : 지정한 알고리즘을 이용하여 해시 생성
    //const pass = crypto.createHash("sha512").update(pw).digest('base64');
    // pdkdf2 (Sync) : (Sync 가 붙으면 동기) 비밀번호 기반 키도줄 함수
    pass = crypto.pbkdf2Sync(pw, salt, lengt, key, algo).toString('base64');
    res.send(pass);
})

app.post('/verifiy', (req, res) => {
    
    const { pw } = req.body;
    const compare = crypto.pbkdf2Sync(pw, salt, lengt, key, algo);
    console.log('compare', compare);
    console.log('pass', pass);

    /** 기본적인 방법 */
    // if (pass === compare) {
    //     res.send(true);
    // } else {
    //     res.send(false)
    // }
    // timingSafeEqual 두개의 버퍼를 상수시간으로 비교하는 함수
    const result =  crypto.timingSafeEqual(compare, Buffer.from(pass,'base64'))
    console.log('result',result)
    res.send(result); 

})
app.listen(PORT, () => {
    console.log(`localhost${PORT}`)
})