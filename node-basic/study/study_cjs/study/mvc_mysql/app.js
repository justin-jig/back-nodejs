const express = require('express');
const app = express();
const PORT = 8000;

/** view engine */
app.set('view engine', 'ejs');

/** 청적 url 설정 */
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));

/** body paser 설정 */
app.use(express.urlencoded({extends:true}));
app.use(express.json());

/** 라우터 분리 */
const indexRouter = require('./routes');
app.use('/', indexRouter);

app.listen(PORT,() => {
    console.log(`http://localhost${PORT}`);
})

