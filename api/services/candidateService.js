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
    
        return models.candidate.create(data);
   
};

exports.login = async (data) =>{
    let a= await models.candidate.findOne({
       
        where: data,

    })
    console.log(a);
    if(a) {
        var b =  a.dataValues
            var access_token = signAccessToken(b);
            var refresh_token = signRefreshToken(b);
          
        } else {
            return Promise.reject({status: ErrorCodes.ERROR_CODE_INVALID_USERNAME_OR_PASSWORD});
        }
    b.access_token=access_token;
    b.refresh_token=refresh_token;
    return b;

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
