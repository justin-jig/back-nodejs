const express = require('express');
const app = express();
const PORT = 8000;


/** express body paser 설정 */
app.use(express.urlencoded({extended: true})); // url 인코딩 방식일 때
app.use(express.json()); // json 방식일 때

/** view engin 설정 */
// set() : server에 속성을 셋팅
app.set("view engine", 'ejs');
app.set('views', './views');

// express get 함수
app.get('/', (req, res) => {
    res.render('form', {title :'axios로 로그인'});
})

// express post 함수
app.post('/login', (req, res) => {
    
    let id = 'test1234'
    let pw = '1234';

    console.log(req.body)

    if ( req.body.id != id ) { 

        res.send({ resultcode:'01', result : '없는 id입니다.'});
        
    } else if ( req.body.pw != pw ) { 

        res.send({ resultcode:'02', result : '비밀번호가 틀립니다.'});
        
    } else {

        res.send({ resultcode:'03', result : '로그인이 되었습니다.'});
    }

})

/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

