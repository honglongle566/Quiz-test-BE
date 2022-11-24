const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController.js');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.post('/', checkAccessToken, questionController.create);

module.exports = router;