
import models from '../models/index.js';
import crypto from 'crypto';

import jwt from 'jsonwebtoken';


const secret = 'kdt'; // 쿠키 secret;
const iterations = 100; // 반복 횟수
const keylen = 64; // 생성할 키의 길이
const digest = 'sha512'; // 해시 알고리즘
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


// GET /user 환영 메세지와 함께 회원가입 및 로그인 링크 보이기
export const user = (req, res) => {
    res.render('user');
}

// GET /user/signup 회원가입 페이지
export const userSignUp =  (req,res) => {
    res.render('signup');
}
// POST /user/signup 회원가입
export const postUserSignUp = async (req, res) => {

        /** 
         * resultcode : 00 = DBerror, 01 = 있는 아이디, 03 = backError, 20 = 로그인 성공  
         */

        const salt = await crypto.randomBytes(16).toString('base64'); // salt 생성
        const hash = await crypto.pbkdf2Sync(req.body.pw, salt, iterations, keylen, digest).toString('base64');
        console.log(req.body)
        models.User.findOne({
            where: { userid : req.body.userid }
        }).then((result) => {
            console.log('result',result);
            if (result === null) { 
                models.User.create({
                    userid : req.body.userid,
                    pw : `${hash}`,
                    name : req.body.name,
                    salt: `${salt}`
                }).then((result) => {
                    console.log('result',result)
                    res.send( { resultcode:'20', user: {
                        userid : req.body.userid,
                        name : req.body.name
                    } });
                }).catch(() => {
                    res.send({resultcode:'00'});
                })

            } else {
                if (result) {
                    res.send({ resultcode:'01'});
                } else {
                    res.send({ resultcode:'03'});
                }
            }
            
        }).catch(() => {
            res.send({ resultcode:'00', user:{}});
        })
}

// GET /user 로그인 페이지
export const userSignIn =  (req,res) => {
    res.render('signin');
}

// POST /user 로그인
export const postUserSignIn= (req, res) => {

    models.User.findOne({
        where: { userid : req.body.userid }
    }).then((result) => {
        if (result=== null) { // 없는 아이디
            res.send({resultcode:'01', user:{}})
        }
        if (result) {
            const { dataValues:row } = result;

            const compare = crypto.pbkdf2Sync(req.body.pw, row.salt, iterations, keylen, digest).toString('base64');

            console.log( 'row.pw', row.pw, 'compare', compare)
            if ( row.pw === compare ) { // 로그인 성공

                const token = jwt.sign({id:req.body.userid}, secret);
                console.log('token',token)
                res.cookie('token', token, cookieConfig);
                res.cookie('userid', row.userid, cookieConfig);
                res.send({resultcode:'20', user:row})
            
            } else { // 로그인 실패
                res.send({resultcode:'02', user:{}});
            }
        }
        
    }).catch(() => {
        res.send({ resultcode:'00', user:{}});
    });

}

// GET /userPofile 페이지
export const userProfile = (req, res) => {
    res.render('profile');
}

// GET /userPofile 정보 가져오기
export const getUser = (req, res) => {

    /** 
     * resultcode : 00 = DBerror, 01 = 없는아이디, 02 = 비밀번호 틀림, 03 = backError, 20 = 로그인 성공  
     */
    console.log('qurey ', req.query)
    
    models.User.findOne({
        where: { userid : req.query.userid }
    }).then((result) => {

        if (result) {
            res.send({ resultcode:'20', user:result});

        } else {
            res.send({ resultcode:'03', user:{}});
        }
        
    }).catch(() => {
        res.send({ resultcode:'00', user:{}});
    });

}
 

// PATCH /user/updateUser 정보 수정
export const updateUser = (req, res) => {

    /** 
     * resultcode : 00 = DBerror, 01 = 없는아이디, 02 = 비밀번호 틀림, 03 = backError 20 = 로그인 성공  
     */

    const update = {   
        userid : req.body.userid,
        name : req.body.name,
    }
    if (req.pw) {
        const salt = crypto.randomBytes(16).toString('base64'); // salt 생성
        const hash = crypto.pbkdf2Sync(req.body.pw, salt, iterations, keylen, digest).toString('base64');
        update.pw = hash;
        update.salt = salt;
    }
  
    
    models.User.update(
        update,
        { where: {
            userid: req.body.userid,
        }}
    ).then((result) => {
        if (result) {
            res.send({ resultcode:'20', user: {userid: req.body.userid, name: req.body.name, pw: req.body.pw}});
        } else {
            res.send({ resultcode:'03', user:{}});
        }
    }).catch(() => {
            res.send({ resultcode:'00', user:{}});
    })
}

// DELETE /user/deleteUser 정보 삭제
export const deleteUser = (req, res) => {

    console.log(req.body);
    /** 
     * resultcode : 00 = DBerror, 01 = 없는아이디, 02 = 비밀번호 틀림, 03 = backError, 20 = 로그인 성공  
     */

    models.User.destroy({
        where: {
            userid :req.body.userid
        }
    }).then((result) => {

        if (result) {
            res.clearCookie('token');
            res.clearCookie('userid');
            res.send({ resultcode:'20'});
        } else {
            res.send({ resultcode:'03'});
        }

    }).catch(() => {
            res.send({ resultcode:'00', user:{}});
    })
}


export const logout = (req,res) => {

    res.clearCookie('token');
    res.clearCookie('userid');
    res.redirect('/');
}

export const findAll = (req, res) => {

    models.User.findAll({
        // attributes 원하는 컬럼 조회
        attributes:['name', 'userid'],
        // Op.ge(초과), Op.gte(이상),Op.lt(미만), Op.ne(같지 않은)
        // Op.or(또는), Op.in(배열 요소중 하나), Op.notIn(배열 요소와 모두 다름)
        // where: { id : {[Op.gte]: 2}},
        // order: [['id','DESC']],
        // limit: 1,
        // offset: 1
    }).then((result) => {

        console.log(result);
        if (result) {
            res.send({ resultcode:'20', data: result});
        } else {
            res.send({ resultcode:'03'});
        }

    }).catch(() => {
            res.send({ resultcode:'00', user:{}});
    })

}