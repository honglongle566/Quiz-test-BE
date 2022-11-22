const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.post('/', checkAccessToken, subjectController.create);
router.delete('/:id', checkAccessToken, subjectController.delete);
router.put('/:id/move', checkAccessToken, subjectController.move);
router.put('/:id', checkAccessToken, subjectController.update);
module.exports = router;