import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const cookieConfig = {
    /** 
     *  httpOnly : 웹 서버를 통해서만 쿠게이 접근 가능, 
     *  자바스크립트에서 document.cookie를 이용해서 접속하는것을 차단
     *  maxAge : 쿠기의 수명, 밀리초
     *  expries : 만료 날짜 GMT 시간 설정
     *  path : 해당 디렉토리와 하위 디렉토리에서만 경로가 활성화되고, 
     *  웹 브라우저는 해당하는 쿠기만 웹 서버에 전송 즉 쿠키가 전쇵된 URL를 특정 가능
     *  domain : 쿠기가 전송될 도메인은 특정 가능 (기본값 : 현제 도메인)
     *  secure : 웹브라우저와 웹서버가 https:로 통신하는 경우만 쿠기를 서버에 전송
     *  signed : 쿠키의 암호화 결정 (req : signedCookies 객체에 들어 있음)
     */
    expries : true,
}


const secret = 'kdt';
const userInfo = { id: 'kdt9', pw: '1234' };
app.get('/',  async (req, res) => {

    if (req.cookies.token) {
        const auth = req.cookies.token;
        try {
            const verify = await jwt.verify(auth , secret);    

            if (verify.id) {

                res.render('index', { isLogin: true, user: verify.id });
            }
        } catch(e) {
            res.render('index', { isLogin: false });

        }
        
    } else {

        res.render('index', { isLogin: false });
    }

});
app.get('/login', (req, res) => {

    if (req.cookies.token) { 

    } else {
        res.render('login');

    }
});
app.post('/login', (req, res) => {
    //로그인이 되는경우
   
    if (req.body.id === userInfo.id && req.body.pw === userInfo.pw) {
        const token = jwt.sign({id:req.body.id}, secret);
        res.cookie('token', token, cookieConfig);
        res.redirect('/');

    } else {
        res.send(`<script>alert('로그인실패');document.location.href='/login';</script>`);
    }
});
app.get('/logout', (req, res) => {

    const token = req.cookies.token;
    if (token === undefined) {
        res.send(`<script>alert('잘못된접근입니다');document.location.href='/';</script>`);
    } else {
        res.clearCookie('token');
        res.redirect('/');
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});