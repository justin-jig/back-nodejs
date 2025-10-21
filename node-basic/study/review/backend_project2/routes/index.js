const express = require('express');
const router = express.Router();
const studentRoute = require('./student.js');

const controller = require('../controller/main.ctrl');


router.get('/', controller.main);
studentRoute(router);




module.exports = router;