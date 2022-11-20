const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
models.group_question.belongsTo(models.user, { foreignKey: "user_id" });

exports.create = async (groupGuestion) => {
    var checkNameExisting = await models.group_question.findOne({
        where: {
            name: groupGuestion.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.group_question.create(groupGuestion);
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.GROUP_QUESTION_EXIST_NAME });
    }
};


exports.update = async (id, groupQuestion) => {
    var checkNameExisting = await models.group_question.findOne({
        where: {
            name: groupQuestion.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.group_question.update(groupQuestion, {
            where: {
                id: id,
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
    return models.group_question.update(delete_option, {
        where: {
            id: id,
            deleted: 0
        }
    })
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

exports.getAllPaging = async (data) => {
    let condition = {
        deleted: 0
    };
    return models.group_question.findAndCountAll(data, {
        where: condition
    })
};