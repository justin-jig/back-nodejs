const express = require('express');
const app = express();
const PORT = 8000;
const indexRoute = require('./routes/index');
const db = require('./models');

/** view enign */
app.set("view engine", 'ejs');
app.set('views', './views');

/** body paser */
app.use(express.urlencoded({extends:true}));
app.use(express.json());

/** router 설정 */
app.use('/', indexRoute);

//* 맨 마지막에 선언
app.use( '*' , (req,res) => {
    res.render('404');
})

db.sequelize.sync({
    force : false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`localhost:${PORT}`);
    })
})

