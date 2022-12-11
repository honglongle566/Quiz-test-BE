const express = require('express');
const router = express.Router();
const candidateController = require('../controller/candidateController');
const { checkAccessTokenCandidate } = require('../middlewares/jwt_token');

//router.delete('/:id', checkAccessToken, categoryController.delete);
router.post('/', candidateController.create);
module.exports = router;