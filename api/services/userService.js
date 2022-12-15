const models = require('../../models');
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const { signAccessToken, signRefreshToken } = require('../middlewares/jwt_token');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');

exports.register = async (account) => {
    const user = await models.user.findOne({
        where: {
            deleted: 0,
            email: account.email
        }
    });
    if (user) {
        return
    }
    const hashedPassword = await argon2.hash(account.password)
    account.password = hashedPassword;
    const newUser = await models.user.create(account);

    const accessToken = jwt.sign(
        { userId: newUser.dataValues.id },
        process.env.ACCESS_TOKEN_SECRET
    )
    return {accessToken} 
}

exports.login = async (account) => {
    const user = await models.user.findOne({
        where: {
            deleted: 0,
            email: account.email
        }
    })
    if (!user)
        return 
    const passwordValid = await argon2.verify(user.dataValues.password, account.password)
    if (!passwordValid)
        return 
    const accessToken = jwt.sign(
        { userId: user.dataValues.id },
        process.env.ACCESS_TOKEN_SECRET
    )
    return {accessToken}
};


//Update
exports.update = async (id, options) => {
    return models.user.update(options, { where: { id: id } });
};

//Delete
exports.delete = async (id) => {
    var options_user = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    };
    return models.user.update(options_user, { where: { id: id, deleted: 0 } });
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
    if (user) {
        return user;
    } else {
        return Promise.resolve({
            message: messageConstants.USER_MAIL_EXIST,
        });
    };
}
//find by token
exports.getByToken = async (token) => {
    const user = await models.user.findOne({
        where: {
            token: token,
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
}

//find by resettoken
exports.getByResetToken = async (reset_token) => {
    const user = await models.user.findOne({
        where: {
            reset_token: reset_token,
            deleted: 0
        }
    });
    if (user) {
        return user;
    } else {
        throw new Error('User not found');
    };
}