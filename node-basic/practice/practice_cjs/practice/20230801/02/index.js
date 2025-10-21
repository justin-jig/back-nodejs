const express = require('express');
const app = express();
const PORT = 8000;

// set() : server에 속성을 셋팅
// ejs setting

app.use(express.urlencoded({extended: true})); // url 인코딩 방식일 때
app.use(express.json()); // json 방식일 때

app.set("view engine", 'ejs');
app.set('views', './views');

// express get 함수
app.get('/', (req, res) => {
    res.render('form', {title :'post으로 정보 받기'});
})

// express get 함수
app.post('/postForm', (req, res) => {

    res.render('result', {title:'post으로 정보 받기', formData: req.body});
})

/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

