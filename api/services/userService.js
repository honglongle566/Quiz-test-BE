const models= require ('../../models');
const bcrypt = require("bcryptjs");   
const {signAccessToken, signRefreshToken} = require('../middlewares/jwt_token');
const {Sequelize, DataTypes} = require("sequelize");
const {ErrorCodes} = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const {Op} = require('sequelize');

//Đăng ký tài khoản người dùng
exports.register = async(user) => {
    const user_name = await models.user.findOne({
        where: {
            deleted: 0, 
            user_name: user.user_name
        }
    });
    if(!user_name){
        if(user.email){
            var emailuser = await models.user.findOne({
                where: {
                    deleted: 0,
                    email: user.email
                }
            });
        }else{
            emailuser = await models.user.findOne({
                where: {
                    deleted: 0,
                    email: user.user_name
                }
            });
        };
        if(user.phone){
            var phoneuser = await models.user.findOne({
                where: {
                    deleted: 0,
                    phone: user.phone
                }
            });
        }else {
            phoneuser = await models.user.findOne({
                where: {
                    deleted: 0,
                    status: 1, 
                    phone: user.user_name
                }
            });
        }
        if(emailuser == null && phoneuser == null ){
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(user.password,salt);
            user.password = hashpassword;
            return models.user.create(user);
        } else {
            return Promise.resolve({
              message: messageConstants.USER_USER+NAME_EXIST,
            });
          }
        } else {
          return Promise.resolve({
            message: messageConstants.USER_MAIL_EXIST,
          });
        };
}

//Update
exports.update = async (id, options) => {
    return models.user.update(options, { where: { id: id } });
};

//Delete
exports.delete = async(id) => {
    var options_user = { 
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    };
    return models.user.update(options_user, {where: {id: id, deleted: 0}});
};

//Đăng nhập tài khoản người dùng 
exports.login = (account) => {
    return models.user.findOne({
        attributes: [
            "id",
            "type",
            "role",
            "user_name",
            "full_name",
            "email",
            "phone",
            "password",
            "gender",
            "date_of_birth",
            "tax_code",
            "avatar",
            "nation"
        ],
        where: {
            deleted: 0,
            status:1,
            user_name: account.user_name
        }
    }).then(async (user) => {
        if(user) {
            const isMatch = await bcrypt.compare(account.password, user.password);
            console.log(isMatch);
            if(isMatch == true) {
                const access_token = signAccessToken(user);
                const refresh_token = signRefreshToken(user);
                return {access_token, refresh_token, user};
            } else {
                return Promise.reject({status: ErrorCodes.ERROR_CODE_INVALID_USERNAME_OR_PASSWORD});
            }
        } else {
            return Promise.reject({status: ErrorCodes.ERROR_CODE_INVALID_USERNAME_OR_PASSWORD});
        }
    });
};

//find by email
exports.getByEmail = async (email) => {
    const user = await models.user.findOne({ 
        where: { 
            email: email, 
            deleted: 0 
        } 
        });
    if (user) { 
      return user;
    } else {
      return Promise.resolve({
        message: messageConstants.USER_MAIL_EXIST,
      });
    };
};
//find by id
exports.getById = async (id) => {
    const user = await models.user.findOne({
        where: {
            id: id,
            deleted: 0
        }
    });
    if(user){
        return user;
    }else {
        return Promise.resolve({
          message: messageConstants.USER_MAIL_EXIST,
        });
    };
}
//find by token
exports.getByToken = async(token) => {
    const user = await models.user.findOne({
        where: {
            token: token,
            deleted: 0
        }
    });
    if(user){
        return user;
    }else {
        return Promise.resolve({
          message: messageConstants.USER_MAIL_EXIST,
        });
    };
}

//find by resettoken
exports.getByResetToken = async(reset_token) => {
    const user = await models.user.findOne({
        where: {
            reset_token: reset_token,
            deleted: 0
        }
    });
    if(user){
        return user;
    }else {
        throw new Error('User not found');
    };
}