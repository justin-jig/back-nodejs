
const userModel = require('../model/user.model');

    
exports.login = (req, res) => {

    const users = userModel.users();
    users.forEach((element, idx) => {
        if ( req.body.id === element.userId ) { 

            if (req.body.pw === element.userpw) {

                return res.send({ resultcode:'03', result : '로그인이 되었습니다.'});
            
            } else {

                return res.send({ resultcode:'02', result : '비밀번호가 틀립니다.'});
            }
        } 

        if (element.length === idx) {
            return res.send({ resultcode:'01', result : '없는 id입니다.'});
        }
    });

}


