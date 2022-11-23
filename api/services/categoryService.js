const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
models.category.belongsTo(models.user, { foreignKey: "user_id" });
models.category.hasMany(models.subject, { foreignKey: 'category_id' })
models.subject.belongsTo(models.category, { foreignKey: 'category_id' })


exports.create = async (category) => {
    var checkNameExisting = await models.category.findOne({
        where: {
            user_id: category.user_id,
            name: category.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.category.create(category);
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.CATEGORY_EXIST_NAME });
    }
};


exports.update = async (id, category) => {
    var checkNameExisting = await models.category.findOne({
        where: {
            user_id: category.user_id,
            name: category.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.category.update(category, {
            where: {
                id: id,
                user_id: category.user_id,
                deleted: 0
            }
        });
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.CATEGORY_EXIST_NAME });
    }

};

exports.delete = async (id) => {
    var delete_option = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    }
    return models.category.update(delete_option, {
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
    return models.category.findAll({
        data,
        where: condition, include: [models.subject]
    })
};

exports.getAllPaging = async (data) => {
    let condition = {
        deleted: 0
    };
    return models.category.findAndCountAll({
        where: condition,
        include: [models.subject],
        ...data,
    })
};