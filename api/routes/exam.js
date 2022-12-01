const express = require('express');
const router = express.Router();
const examController = require('../controller/examController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.post('/:id/question', checkAccessToken, examController.createQuestionByExam);
router.post('/', checkAccessToken, examController.create);
router.put('/:id/add-question', checkAccessToken, examController.addQuestionsToExam);
router.put('/:id/remove-question', checkAccessToken, examController.removeQuestionsToExam);
router.put('/:id', checkAccessToken, examController.update);
router.delete('/:id', checkAccessToken, examController.delete)
router.get('/all-paging', checkAccessToken, examController.getAllPaging);
router.get('/:id', checkAccessToken, examController.getById);
router.get('/', checkAccessToken, examController.getAll);
module.exports = router;