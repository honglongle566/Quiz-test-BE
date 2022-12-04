const models = require('../../models');
const bcrypt = require("bcryptjs");   
const { Op } = require("sequelize");
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
const { assign } = require('nodemailer/lib/shared');
const { matchedData } = require('express-validator');
const {signAccessToken, signRefreshToken} = require('../middlewares/jwt_token');

exports.create = async (data) => {
    
    return models.candidate_result_detail.create(data);

};