const express = require('express');
const app = express();
const PORT = 8000;

/** view enign */
app.set("view engine", 'ejs');
app.set('views', './views');

/** body paser */
app.use(express.urlencoded({extends:true}));
app.use(express.json());

/** router 설정 */
// app.use('/', router);

//* 맨 마지막에 선언
app.use( '*' , (req,res) => {
    res.render('404');
})

app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
})