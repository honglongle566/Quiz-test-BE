const express = require('express');
const router = express.Router();
const candidateController = require('../controller/candidateController');
const { checkAccessToken } = require('../middlewares/jwt_token');

//router.delete('/:id', checkAccessToken, categoryController.delete);
router.post('/', checkAccessToken, candidateController.create);
module.exports = router;