const express = require('express');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser')

/** view Engine */
app.set('view engine', 'ejs');

/** cookie-parser */
// 일반 쿠기
app.use(cookieParser());
// 암호화 쿠키
app.use(cookieParser("asdf"));


// cookie 옵션 객체
const cookieConfig = {
    /** 
     *  httpOnly : 웹 서버를 통해서만 쿠게이 접근 가능, 
     *  자바스크립트에서 document.cookie를 이용해서 접속하는것을 차단
     *  maxAge : 쿠기의 수명, 밀리초
     *  expries : 만료 날짜 GMT 시간 설정
     *  path : 해당 디렉토리와 하위 디렉토리에서만 경로가 활성화되고, 
     *  웹 브라우저는 해당하는 쿠기만 웹 서버에 전송 즉 쿠키가 전쇵된 URL를 특정 가능
     *  domain : 쿠기가 전송될 도메인은 특정 가능 (기본값 : 현제 도메인)
     *  secure : 웹브라우저와 웹서버가 https:로 통신하는 경우만 쿠기를 서버에 전송
     *  signed : 쿠키의 암호화 결정 (req : signedCookies 객체에 들어 있음)
     */

    httpOnly: true,
    maxAge : 60 * 1000, // 1분
    signed:true
}

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/setCookie', (req, res) => {
    //쿠키이름, 쿠키값, 옵션객체
    res.cookie('myCookie', `myValue`, cookieConfig);
    res.send('set cookie');
})
app.get('/getCookie', (req, res) => {
    //res.send(req.cookies);

    res.send(req.signedCookies)
})
app.get('/clearCookie', (req, res) => {
    res.clearCookie();
    res.send('clear cookie');
})
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
})