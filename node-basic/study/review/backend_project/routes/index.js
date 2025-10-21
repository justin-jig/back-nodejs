const express = require('express');
const router = express.Router();

const controller = require('../controller/main.ctrl');


router.get('/', controller.main);


module.exports = router;