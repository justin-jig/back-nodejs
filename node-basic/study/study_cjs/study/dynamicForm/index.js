const express = require('express');
const app = express();
const PORT = 8000;

//body-parser
app.use(express.urlencoded({extended: true})); // url 인코딩 방식일 때
app.use(express.json()); // json 방식일 때

//view engine
app.set("view engine", 'ejs');
app.set('views', './views');

//router
app.get('/', (req, res) => {
    res.render('dynamicForm');
})

/** ajax */
app.get('/ajax', (req, res) => {
    console.log('back', req.query);
    res.send(req.query);
})
app.post('/ajax', (req, res) => {
    console.log('back', req.body);
    res.send(req.body);
})

/** axios */
app.get('/axios', (req, res) => {
    console.log('back', req.query);
    res.send(req.query);
})

app.post('/axios', (req, res) => {
    console.log('back', req.body);
    res.send(req.body);
})

/** fetch */
app.get('/fetch', (req, res) => {
    console.log('back', req.query);
    res.send(req.query);
})
app.post('/fetch', (req, res) => {
    console.log('back', req.body);
    res.send(req.body);
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})