const express = require('express');
const usersRouter = require('./user');
const examRouter = require('./exam');
const examinationRouter = require('./examination_room')

const router = express.Router();
router.use('/user', usersRouter);
router.use('/exam', examRouter);
router.use('/examination-room', examinationRouter);


module.exports = router;
