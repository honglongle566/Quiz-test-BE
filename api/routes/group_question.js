const express = require('express');
const router = express.Router();
const group_questionController = require('../controller/group_questionController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.post('/', checkAccessToken, group_questionController.create);
router.delete('/:id', checkAccessToken, group_questionController.delete);
router.put('/:id', checkAccessToken, group_questionController.update);
router.get('/', group_questionController.getAll);
router.get('/all-paging', group_questionController.getAllPaging);
module.exports = router;