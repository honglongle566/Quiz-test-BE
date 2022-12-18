const express = require('express');
const router = express.Router();
const statisticalController = require('../controller/statisticalController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.get('/', statisticalController.get);

module.exports = router;