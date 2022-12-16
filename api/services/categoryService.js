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

exports.getAllPaging = async (data, keyword, user_id) => {
    let condition = {
        deleted: 0,
        user_id: user_id,
    };
    if (keyword) {
        condition.name = {
            [Op.like]: `%${keyword}%`,
        }
    }
    const { count, rows } = await models.category.findAndCountAll({
        where: condition,
        ...data,
        order: [
            ['id', 'DESC'],
        ],
    })
    if (!count) {
        return { count: 0, rows: [] }
    }
    const rowsJSON = JSON.parse(JSON.stringify(rows))
    const categoryIds = rowsJSON.map(item => {
        return item.id
    })
    const subject = await models.subject.findAll({
        where: {
            category_id: { [Op.in]: categoryIds },
            ...condition
        },
    })
    const rowsCategorySubject = rowsJSON.map(item => {
        return { ...item, subjects: JSON.parse(JSON.stringify(subject)).filter(sub => sub.category_id === item.id) }
    });
    return { count, rows: rowsCategorySubject }
};
