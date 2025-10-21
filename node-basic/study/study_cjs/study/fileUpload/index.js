const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 8000;
const path = require('path'); // 경로 설정 제어

app.use(express.urlencoded({extended: true})); // url 인코딩 방식일 때
app.use(express.json()); // json 방식일 때
// set() : server에 속성을 셋팅
// ejs setting
app.set("view engine", 'ejs');
app.set('views', './views');

// 정적파일설정
app.use('/uploads', express.static(__dirname + '/uploads'));

//multer
const upload = multer({
    //dest: 업로드할 파일을 저장할 경로를 지정
    dest: 'uploads/'
})

const uploadDetail = multer({
    // storage: 저장할 공간에 대한 정보
    // diskStorage: 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공
    storage: multer.diskStorage ({
        destination (req, file, done) {
            done(null, './uploads/') 
        },
        filename (req, file, done) {
            const ext = path.extname(file.originalname);
            console.log('ext', ext);
            done(null, path.basename(file.originalname, ext)+ Date.now() + ext);
        }
    }),
    limits: {fileSize : 5 * 1024 * 1024 },
})


// express get 함수 Router, Routing
app.get('/', (req, res) => {
    // send () 클라이언트에 응답 데이터를 보낼 때
    // res.send("Hello Express");
    res.render('index');
})

// 싱글 
app.post('/upload', uploadDetail.single('userfile'), (req, res) =>{
   
    console.log(req.file);
    console.log(req.body);
    res.send('good');

})

// 멀티(ver 1) 
app.post('/upload/array', uploadDetail.array('userfiles'), (req, res) =>{
    
    console.log(req.files);
    console.log(req.body);
    res.send('good');

})

// 멀티(ver 2) 
app.post('/upload/fields', uploadDetail.fields([{name : 'userfiles1'}, { name : 'userfiles2'}]), 
            (req, res) =>{
    console.log(req.files);
    console.log(req.body);
    res.send('good');
})

// 동적 
app.post('/dynamicFile', uploadDetail.array('dynamic-file'), (req, res) =>{
    console.log(req.files);
    res.send(req.files[0]);
})



/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

