import * as userController from '../controller/user.controller.js';

// localhost:PROT/user
const UserRote = (router) => {

    return (
        // GET /user 환영 메세지와 함께 회원가입 및 로그인 링크 보이기
        router.get('/user', userController.user),
        // GET /user 회원가입 페이지
        router.get('/user/signup', userController.userSignUp),
        // POST /user 회원가입 
        router.post('/user/signup', userController.postUserSignUp),

        // GET /user 로그인 페이지
        router.get('/user/signin', userController.userSignIn),
        // POST /user 로그인 페이지
        router.post('/user/signin', userController.postUserSignIn),

        // GET /user 프로필 페이지
        router.get('/user/profile', userController.userProfile),
        
        // GET /user 프로필 정보 get
        router.get('/user/getUser', userController.getUser),

        // POST /user 프로필 정보 update
        router.patch ('/user/updateUser', userController.updateUser),
        // POST /user 프로필 정보 update
        router.delete ('/user/deleteUser', userController.deleteUser),

        // POST /user logout
        router.post ('/user/logout', userController.logout),


        // findAll
        router.get('/user/findAll', userController.findAll)
    )
}

  
export default UserRote