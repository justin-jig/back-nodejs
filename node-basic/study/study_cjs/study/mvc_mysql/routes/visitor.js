
/** controller */
const controller = require('../controller/visitor.controller');


// localhost:PROT/visitor
exports.visitorRoute = (router) => {

    return (
        // GET /visitor 방명록 전체 보이기
        router.get('/visitor' , controller.getVisitors),
        // GET /visitor 방명록 하나 조회
        router.get('/visitor/get' ,controller.getVisitor),
        // POST /visitor 방명록 하나 생성
        router.post('/visitor/write', controller.postVisitor),
        //PATCH /visitor/edit 방명록 하나 수정
        router.patch('/visitor/edit' , controller.patchVisitor),
        // DELETE /visitor/delete 방명록 하나 삭제
        router.delete('/visitor/delete' , controller.deleteVisitor)
    );
}
