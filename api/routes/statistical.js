const express = require('express');
const router = express.Router();
const statisticalController = require('../controller/statisticalController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.get('/', statisticalController.get);
router.get('/exam', statisticalController.get1);
router.get('/total', statisticalController.getAllToTal);
router.get('/:id', statisticalController.getById);

module.exports = router;