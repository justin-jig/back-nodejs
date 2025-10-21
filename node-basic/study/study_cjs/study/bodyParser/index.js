const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: true})); // url 인코딩 방식일 때
app.use(express.json()); // json 방식일 때

// set() : server에 속성을 셋팅
// ejs setting
app.set("view engine", 'ejs');
app.set('views', './views');


// express get 함수 Router, Routing
app.get('/', (req, res) => {
    // send () 클라이언트에 응답 데이터를 보낼 때
    // res.send("Hello Express");
    res.send('<h1>Hello Express</h1> <a href="/form">폼으로 이동</a>');
})

app.get('/form', (req, res) => {
    // send () 클라이언트에 응답 데이터를 보낼 때
    console.log(req.body)
    res.render('form', { title: 'form 전송 실습'});
})


app.get('/getForm', (req, res) => {

    console.log(req.query)
    res.render('result', { result : true,title:'get form',userInfo: {id:req.query.id, pw:req.query.pw }});
})

app.post('/postForm', (req, res) => {
    console.log(req.body)
    res.render('result', {result : true, title:'post form', userInfo: {id:req.body.id, pw:req.body.pw }});
})


/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

