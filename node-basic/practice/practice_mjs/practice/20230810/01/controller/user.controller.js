
import models from '../models/index.js';
import {Op} from 'sequelize';

// GET /user 환영 메세지와 함께 회원가입 및 로그인 링크 보이기
export const user = (req, res) => {
    res.render('user');
}

// GET /user/signup 회원가입 페이지
export const userSignUp =  (req,res) => {
    res.render('signup');
}
// POST /user/signup 회원가입
export const postUserSignUp = (req, res) => {

    console.log('req', req.body);
         /** 
         * resultcode : 00 = DBerror, 01 = 있는 아이디, 03 = backError, 20 = 로그인 성공  
         */
        models.User.findOne({
            where: { userid : req.body.userid }
        }).then((result) => {

            if (result === null) { 

                models.User.create({
                    userid : req.body.userid,
                    pw : req.body.pw,
                    name : req.body.name
                }).then((result) => {
                    res.send( { resultcode:'20', user: {
                        userid : req.body.userid,
                        pw : req.body.pw,
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
        console.log('result', result)
        if (result=== null) { // 없는 아이디
            res.send({resultcode:'01', user:{}})
        }
        if (result) {

            const { dataValues:row } = result;

            console.log(row.pw, req.body.pw)
            if ( row.pw === req.body.pw) { // 로그인 성공
                return res.send({resultcode:'20', user:row})
            
            } else { // 로그인 실패

                if (row.pw != req.body.pw ) {
                    return res.send({resultcode:'02', user:{}});
                } else {
                    return res.send({resultcode:'03', user:{}});
                }
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
        where: { userid : req.query.userid}
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
    models.User.update(
        {   
            userid : req.body.userid,
            name : req.body.name,
            pw : req.body.pw
        },
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
            res.send({ resultcode:'20'});
        } else {
            res.send({ resultcode:'03'});
        }

    }).catch(() => {
            res.send({ resultcode:'00', user:{}});
    })
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