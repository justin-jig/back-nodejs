
import express from 'express';
import indexRote from './route/index.js';

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