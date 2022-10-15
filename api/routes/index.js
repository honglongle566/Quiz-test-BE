const express = require('express');
const usersRouter = require('./user');

const router = express.Router();
router.use('/user', usersRouter);


module.exports = router;
