const express = require('express'); // express 모듈 가져오기
const app = express(); // app 변수에 express initalizing
const PORT = 8000; // PORT 설정
const route = require('./route/index')


/** express body paser 설정 */
app.use(express.urlencoded({extended:true})) // url 인코딩 방식 설정
app.use(express.json()); // json 방식 설정

/** view engin 설정 */
app.set("view engine", "ejs"); // ejs 설정
app.set('views','./views'); // 정적 파일 경로 설정

/** router 설정 */
app.use('/', route);


//* 맨 마지막에 선언
app.use( '*' , (req,res) => {
    res.render('404');
})

/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

