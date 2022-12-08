const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.get('/', checkAccessToken, subjectController.getAll);
router.post('/', checkAccessToken, subjectController.create);
router.post('/all',checkAccessToken,subjectController.createAll)
router.delete('/:id', checkAccessToken, subjectController.delete);
router.put('/:id/move', checkAccessToken, subjectController.move);
router.put('/:id', checkAccessToken, subjectController.update);
module.exports = router;