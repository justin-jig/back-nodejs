const express = require('express');
const indexRote = require('./route/index');

/** express setting */
const app = express();
const PORT = 8000;


/** body paser */
app.use(express.urlencoded({extended:true}))
app.use(express.json());

/** view engine */
app.set('view engine', 'ejs');
app.set('views', './views');

/** routor 분리 */
app.use('/', indexRote)

app.listen(PORT,() => {
    console.log(`localhost:${PORT}`)
}) 