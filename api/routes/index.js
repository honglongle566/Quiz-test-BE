const express = require('express');
const usersRouter = require('./user');
const examRouter = require('./exam');
const examinationRouter = require('./examination_room')
const groupQuestionRouter = require('./group_question')
const categoryRouter = require('./category')
const subjectRouter = require('./subject')

const router = express.Router();
router.use('/user', usersRouter);
router.use('/exam', examRouter);
router.use('/examination-room', examinationRouter);
router.use('/group-question', groupQuestionRouter);
router.use('/category', categoryRouter);
router.use('/subject', subjectRouter);


module.exports = router;
