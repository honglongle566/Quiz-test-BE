const express = require('express');
const usersRouter = require('./user');
const examRouter = require('./exam');
const examinationRouter = require('./examination_room');
const groupQuestionRouter = require('./group_question');
const categoryRouter = require('./category');
const subjectRouter = require('./subject');
const questionRouter = require('./question');

const router = express.Router();
router.use('/api/user', usersRouter);
router.use('/api/exam', examRouter);
router.use('/api/examination-room', examinationRouter);
router.use('/api/group-question', groupQuestionRouter);
router.use('/api/category', categoryRouter);
router.use('/api/subject', subjectRouter);
router.use('/api/question', questionRouter);


module.exports = router;
