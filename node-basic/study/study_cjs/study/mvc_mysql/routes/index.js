const express = require('express');
const router = express.Router();
const visitor = require('./visitor');
/** controller */
const controller = require('../controller/index.controller');

// 기본 주소 : localhost:PROT
// GET / => localhost:PROT/
router.get('/', controller.main);

// localhost:PROT/visitor
visitor.visitorRoute(router);

/**[404 ERROR] 맨 마지막 라우트로 선언 */
router.use('*', (req, res) => {
    res.render('404');
})

module.exports = router;