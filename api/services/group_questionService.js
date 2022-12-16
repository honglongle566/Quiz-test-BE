const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
const { Op } = require("sequelize");
models.group_question.belongsTo(models.user, { foreignKey: "user_id" });

exports.create = async (groupQuestion) => {
    var checkNameExisting = await models.group_question.findOne({
        where: {
            user_id: groupQuestion.user_id,
            name: groupQuestion.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.group_question.create(groupQuestion);
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.GROUP_QUESTION_EXIST_NAME });
    }
};

exports.update = async (id, groupQuestion) => {
    var checkNameExisting = await models.group_question.findOne({
        where: {
            user_id: groupQuestion.user_id,
            name: groupQuestion.name,
            deleted: 0
        }
    });
    if (!checkNameExisting || checkNameExisting?.dataValues?.id == id) {
        return models.group_question.update(groupQuestion, {
            where: {
                id: id,
                user_id: groupQuestion.user_id,
                deleted: 0
            }
        });
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.GROUP_QUESTION_EXIST_NAME });
    }
};

exports.delete = async (id) => {
    var delete_option = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    }
    const newGroupQuestion = await models.group_question.update(delete_option, {
        where: {
            id: id,
            deleted: 0
        }
    })
    if (!newGroupQuestion) {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_API_NOT_FOUND, message: 'NOT FOUND' });
    }
    return newGroupQuestion
};

exports.getAll = async (data) => {
    let condition = {
        deleted: 0
    };
    return models.group_question.findAll({
        data,
        where: condition
    });
};

exports.getAllPaging = async (data, keyword, user_id) => {
    let condition = {
        deleted: 0,
        user_id: user_id,
        name: {
            [Op.like]: `%${keyword}%`,
        }

    };
    return models.group_question.findAndCountAll({
        where: condition,
        ...data,
        order: [
            ['id', 'DESC'],
        ],
    })
};