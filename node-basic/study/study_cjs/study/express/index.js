const express = require('express');
const app = express();
const PORT = 8000;

// express get 함수
app.get('/', (req, res) => {

    // send () 클라이언트에 응답 데이터를 보낼 때
    // res.send("Hello Express");
    res.send({result : true, code: 1000, message: '회원가입성공', data: {name : 'martin'}});
})

/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

