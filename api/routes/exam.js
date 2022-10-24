const express = require('express');
const router = express.Router();
const examController = require('../controller/examController');
const {checkAccessToken,checkAdmin2} = require('../middlewares/jwt_token');

router.post('/',checkAccessToken,checkAdmin2,examController.create);

module.exports = router;