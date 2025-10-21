
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRote from './route/index.js';
import db from './models/index.js'

const __dirname = path.resolve();
/** express setting */
const app = express();
const PORT = 8000;


app.use(cookieParser());

/** view engine 설정 */
app.set('view engine', 'ejs');
app.set("views", process.env.Node_START ? path.join(__dirname, '/practice/20230818/01/views') : './views');

/** body paser */
app.use(express.urlencoded({extended:true}))
app.use(express.json());

/** routor 분리 */
app.use('/', indexRote)

db.sequelize.sync({
    force:false
}).then(() => {
    app.listen(PORT,() => {
        console.log(`localhost:${PORT}`)
    }) 
})
