const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
const { Op } = require("sequelize");
models.category.hasMany(models.subject, { foreignKey: 'category_id' })
models.subject.belongsTo(models.category, { foreignKey: 'category_id' })

exports.create = async (subject) => {
    var checkNameExisting = await models.subject.findOne({
        where: {
            category_id: subject.category_id,
            name: subject.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.subject.create(subject);
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.SUBJECT_EXIST_NAME });
    }
};


exports.update = async (id, subject) => {
    var checkNameExisting = await models.subject.findOne({
        where: {
            category_id: subject.category_id,
            name: subject.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.subject.update(subject, {
            where: {
                id: id,
                category_id: subject.category_id,
                deleted: 0
            }
        });
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.SUBJECT_EXIST_NAME });
    }

};

exports.move = async (id, subject) => {
    var oldSubject = await models.subject.findOne({
        where: {
            id,
            deleted: 0
        }
    });
    if (!oldSubject)
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.SUBJECT_NOT_FOUND });
    var checkNameExisting = await models.subject.findOne({
        where: {
            category_id: subject.new_category_id,
            name: oldSubject.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.subject.update({ ...oldSubject, category_id: subject.new_category_id }, {
            where: {
                id: id,
                deleted: 0
            }
        });
    } else {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.SUBJECT_MOVE_EXIST_NAME });
    }

};

exports.delete = async (id) => {
    var delete_option = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    }
    return models.subject.update(delete_option, {
        where: {
            id: id,
            deleted: 0
        }
    })
};

exports.getAll = async (data) => {
    const categories = await models.category.findAll({
        where: {
            user_id: data.user_id
        }
    })
    const categoryJSON = JSON.parse(JSON.stringify(categories))
    let condition = {
        deleted: 0,
        ...data,
    };
    delete condition.name
    delete condition.user_id
    if (data?.name) {
        condition.name = {
            [Op.like]: `%${data.name}%`,
        }
    }
    if (!data?.category_id) {
        condition.category_id = {
            [Op.in]: categoryJSON.map(item => item.id) || [],
        }
    }
    const subjects = await models.subject.findAll({
        where: condition,
    });

    const subjectJSON = JSON.parse(JSON.stringify(subjects))

    return subjectJSON.map(item => {
        return { ...item, category: categoryJSON.find(c => c.id === item.category_id) }
    })
};
