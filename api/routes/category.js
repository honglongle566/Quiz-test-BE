const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.delete('/:id', checkAccessToken, categoryController.delete);
router.put('/:id', checkAccessToken, categoryController.update);
router.get('/', checkAccessToken, categoryController.getAll);
router.get('/all-paging', checkAccessToken, categoryController.getAllPaging);
module.exports = router;