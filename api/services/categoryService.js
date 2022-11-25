const models = require('../../models');
const { Op } = require("sequelize");
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
    return models.category.destroy({
        where: {
            id: id,
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

exports.getAllPaging = async (data, keyword) => {
    let condition = {
        deleted: 0,
    };
    if (keyword) {
        condition.name = {
            [Op.like]: `%${keyword}%`,
        }
    }
    return models.category.findAndCountAll({
        where: condition,
        include: {
            model: models.subject,
            where: {
                deleted: 0
            }
        },
        ...data,
        order: [
            ['id', 'DESC'],
        ],
    })
};