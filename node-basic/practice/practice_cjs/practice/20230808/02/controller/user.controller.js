
const userModel = require('../model/user.model')


// GET /user 환영 메세지와 함께 회원가입 및 로그인 링크 보이기
exports.user = (req, res) => {
    res.render('user');
}

// GET /user/signup 회원가입 페이지
exports.userSignUp =  (req,res) => {
    res.render('signup');
}
// POST /user/signup 회원가입
exports.postUserSignUp = (req, res) => {

    console.log('req', req.body);
    
         /** 
         * resultcode : 00 = DBerror, 01 = 있는 아이디, 03 = backError, 20 = 로그인 성공  
         */

    userModel.postUserSearch(req.body.userid, (err, row) => {
        if (err) {

            return res.send({ resultcode:'00', user:{}});
        }

        if (row.length === 0) { 
            userModel.postUserSignUp(req.body.userid, req.body.pw, req.body.name ,(err, row) => {

                if (err) {
                    res.send({resultcode:'00'});
                }
                res.send( { resultcode:'20', user: {
                    userid : req.body.userid,
                    pw : req.body.pw,
                    name : req.body.name
                } });
            })
        } else {

            if (row.length != 0) {

                return res.send({ resultcode:'01'});
            }

            return res.send({ resultcode:'03'});
        }
    })

  
}

// GET /user 로그인 페이지
exports.userSignIn =  (req,res) => {
    res.render('signin');
}

// POST /user 로그인
exports.postUserSignIn= (req, res) => {

    userModel.postUserSearch(req.body.userid, (err, row) => {

        console.log('row',row)
        /** 
         * resultcode : 00 = DBerror, 01 = 없는아이디, 02 = 비밀번호 틀림, 03 = backError, 20 = 로그인 성공  
         */
        if (err) { // error 일때
            return res.send({ resultcode:'00', user:{}});
        }

        if (row.length === 0) { // 없는 아이디
            return res.send({resultcode:'01', user:{}})
        }
        if (row.length != 0) {

            console.log(row[0].pw, req.body.pw)
            if ( row[0].pw === req.body.pw) { // 로그인 성공
                return res.send({resultcode:'20', user:row[0]})
            
            } else { // 로그인 실패

                if (row[0].pw != req.body.pw ) {
                    return res.send({resultcode:'02', user:{}});
                } else {
                    return res.send({resultcode:'03', user:{}});
                }
            }
        }

    })
}

// GET /userPofile 페이지
exports.userProfile = (req, res) => {
    res.render('profile');
}

// GET /userPofile 정보 가져오기
exports.getUser = (req, res) => {

    console.log(req.query);
    userModel.postUserSearch(req.query.userid, (err, row) => {

        /** 
         * resultcode : 00 = DBerror, 01 = 없는아이디, 02 = 비밀번호 틀림, 03 = backError, 20 = 로그인 성공  
         */
        if (err) {
            return res.send({ resultcode:'00', user:{}});
        }
        console.log('row',row)
        if (row.length != 0) {
            return res.send({ resultcode:'20', user:row[0]});

        } else {
            return res.send({ resultcode:'03', user:{}});
        }
    })
}
 

// PATCH /user/updateUser 정보 수정
exports.updateUser = (req, res) => {

    let querymdified = ''
    for (let key in req.body) {

        if (key != 'id') {
            querymdified += `${key}` + '=' + `'${req.body[key]}',`
        }
    }

    // 마지막 콤마 삭제
    querymdified = querymdified.slice(0, querymdified.length -1);

    console.log(req.body)
    console.log('querymdified', querymdified)
    /** 
     * resultcode : 00 = DBerror, 01 = 없는아이디, 02 = 비밀번호 틀림, 03 = backError 20 = 로그인 성공  
     */

    userModel.updateUser(querymdified, req.body.id, (err, row) => {

        console.log('row',row)
        if (err) {
            return res.send({ resultcode:'00', user:{}});
        }
        if (row) {
            return res.send({ resultcode:'20', user: {userid: req.body.userid, name: req.body.name, pw: req.body.pw}});
        } else {
            return res.send({ resultcode:'03', user:{}});
        }
    })
}

// DELETE /user/deleteUser 정보 삭제
exports.deleteUser = (req, res) => {

    console.log(req.body);
    userModel.deleteUser(req.body.userid, (err, row) => {
        /** 
         * resultcode : 00 = DBerror, 01 = 없는아이디, 02 = 비밀번호 틀림, 03 = backError, 20 = 로그인 성공  
         */
        if (err) {
            return res.send({ resultcode:'00', user:{}});
        } 
        if (row) {
            return res.send({ resultcode:'20'});
        } else {
            return res.send({ resultcode:'03'});
        }

    })
}
