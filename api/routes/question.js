const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController.js');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.post('/', checkAccessToken, questionController.create);
router.put('/:id', checkAccessToken, questionController.update);
router.delete('/:id', questionController.delete);
router.get('/:id', questionController.getById);
router.get('/', questionController.getAll);
router.get('/all-paging', questionController.getAllPaging);

module.exports = router;