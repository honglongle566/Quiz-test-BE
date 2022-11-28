const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController.js');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.post('/', checkAccessToken, questionController.create);
router.put('/:id', checkAccessToken, questionController.update);
router.delete('/:id', checkAccessToken, questionController.delete);
router.get('/all-paging', questionController.getAllPaging);
router.get('/:id', questionController.getById);
router.get('/', questionController.getAll);

module.exports = router;