const express = require('express');
const usersRouter = require('./user');
const examRouter = require('./exam');

const router = express.Router();
router.use('/user', usersRouter);
router.use('/exam', examRouter);

module.exports = router;
