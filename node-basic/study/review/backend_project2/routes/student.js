

const controller = require('../controller/student.ctrl');

const studentRoute = (router) => {

    return (
        router.post('/student', controller.post_student),
        router.get('/student/get', controller.get_student),
        router.post('/class', controller.post_class)
    );
}

module.exports = studentRoute;

