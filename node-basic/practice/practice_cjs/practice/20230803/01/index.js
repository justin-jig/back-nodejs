const express = require('express'); // express 모듈 가져오기
const app = express(); // app 변수에 express initalizing
const multer = require('multer');
const PORT = 8000; // PORT 설정
const path = require('path'); // 경로 설정 제어


/** express body paser 설정 */
app.use(express.urlencoded({extended:true})) // url 인코딩 방식 설정
app.use(express.json()); // json 방식 설정

/** view engin 설정 */
app.set("view engine", "ejs"); // ejs 설정
app.set('views','./views'); // 정적 파일 경로 설정

app.use('/uploads', express.static(__dirname + '/uploads'));// uloads 정적 파일설정

/** 파일 multer 설정 */
const fileuploadDetail = multer({
    storage: multer.diskStorage({ // 저장공간 설정

        destination (req, file, done) {// 저장할 경로 설정
            done(null, 'uploads/') 
        },
        filename (req, file, done) { // 파일name에 대한 설정
            const ext = path.extname(file.originalname); // 파일명 확장자 제외한 파일명 삭제
         
            done(null, req.body.id+ Date.now() + ext);// 파일명 설정
        }

    }),
    limits : { fileSize: 5 * 1024 *  1024 } // 파일 사이즈 설정
})

// express get 함수
app.get('/', (req, res) => {
    res.render('index');
})

// express post 함수
app.post('/fileUpload', fileuploadDetail.single('join-profile'), (req, res) => {
    console.log(req.file);
    console.log(req.body);

    res.send({ formData : {
        id : req.body.id,
        name : req.body.name,
        age : req.body.age,
        profile : req.file
    }})
})

/** 서버 열어주는 함수 */
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

