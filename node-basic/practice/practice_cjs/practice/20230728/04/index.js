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
    res.render('index');
})
// express get 함수
app.get('/larva', (req, res) => {
    res.render('larva');
})
// express get 함수
app.get('/fruit', (req, res) => {
    res.render('fruit', {
        fruit: [
            { name: 'apple', kor: '사과' },
            { name: 'banana', kor: '바나나' },
            { name: 'grape', kor: '포도' },
            { name: 'peach', kor: '복숭아' },
        ],
    });
})
// express get 함수
app.get('/multiplicationTables', (req, res) => {
    res.render('multiplicationTables', {
        index:[2,3,4,5,7,8,9]
    });
})
/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

