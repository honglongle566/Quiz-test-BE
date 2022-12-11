const models = require('../../models');
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
const { assign } = require('nodemailer/lib/shared');
const { matchedData } = require('express-validator');
const { signAccessToken, signRefreshToken } = require('../middlewares/jwt_token');

exports.register = async (account) => {
  const newCandidate = await models.candidate.create(account);

  const accessToken = jwt.sign(
    { candidateId: newCandidate.dataValues.id },
    process.env.ACCESS_TOKEN_SECRET
  )
  return { success: true, accessToken, candidate: newCandidate }
}

exports.update = async (id, data) => {
  let question = await models.candidate.update(data, {
    where: {
      id: id,
      deleted: 0,
    },
  });
  if (question) {
    return true;
  } else {
    return false;
  }
};
