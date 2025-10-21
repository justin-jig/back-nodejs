const express = require('express');
const app = express();
const PORT = 8000;

// set() : server에 속성을 셋팅
// ejs setting
app.set("view engine", 'ejs');
app.set('views', './views');

// 정적인 파일 불러오기
app.use('/public', express.static('./public'));

// express get 함수
app.get('/', (req, res) => {

    res.send({result : true, code: 1000, message: '회원가입성공', data: {name : 'martin'}});
})

// express get 함수
app.get('/kdt9', (req, res) => {
    res.render('page', {name:"justin"});
})

/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

