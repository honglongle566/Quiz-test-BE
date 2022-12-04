const express = require('express');
const router = express.Router();
const candidateResultDetailController = require('../controller/candidate_result_detailController');
const { checkAccessToken } = require('../middlewares/jwt_token');

//router.delete('/:id', checkAccessToken, categoryController.delete);
router.post('/', checkAccessToken, candidateResultDetailController.create);
module.exports = router;