const express = require('express');
const router = express.Router();
const candidateResultDetailController = require('../controller/candidate_result_detailController');
const { checkAccessTokenCandidate } = require('../middlewares/jwt_token');

//router.delete('/:id', checkAccessToken, categoryController.delete);
router.post('/', checkAccessTokenCandidate, candidateResultDetailController.create);
router.put('/', checkAccessTokenCandidate, candidateResultDetailController.update);
router.get('/', checkAccessTokenCandidate, candidateResultDetailController.result);

module.exports = router;