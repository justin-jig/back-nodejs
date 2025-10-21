const express = require('express');
const router = express.Router();
const controller = require('../controller/comment.ctr');

router.get('/', controller.main);
//GET /commnets
router.get('/comments', controller.comments)
//GET /comment/:id
router.get('/comment:id', controller.comment)

module.exports = router;
