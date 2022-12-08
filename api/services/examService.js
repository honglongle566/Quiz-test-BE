const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
const { Op } = require("sequelize");
const { question } = require('../../models');
models.exam.belongsTo(models.user, { foreignKey: "user_id" });
models.exam.belongsTo(models.subject, { foreignKey: "subject_id" });

//Create exam
exports.create = async (exam) => {
    return models.exam.create(exam);
};


//Update exam
exports.update = async (id, examUpdate) => {
    return models.exam.update(examUpdate, {
        where: {
            id: id,
            deleted: 0
        }
    });
};
exports.addQuestionsToExam = async (id, data) => {
    const oldExam = await models.exam.findOne({
        where: {
            id: id,
            deleted: 0
        }
    })
    const questions = data.questions
    const oldQuestion = oldExam.dataValues.question ? JSON.parse(oldExam.dataValues.question) : [];
    const newQuestion = Array.from(new Set([...oldQuestion, ...questions]))
    if (oldQuestion.length === newQuestion.length) {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: 'EXAM_EXIST_QUESTION' });
    }
    const dataUpdate = {
        question: newQuestion
    }
    return models.exam.update(dataUpdate, {
        where: {
            id: id,
            deleted: 0
        }
    });
};

exports.removeQuestionsToExam = async (id, data) => {
    const oldExam = await models.exam.findOne({
        where: {
            id: id,
            deleted: 0
        }
    })
    const questions = data.questions || []
    const oldQuestion = oldExam.dataValues.question ? JSON.parse(oldExam.dataValues.question) : [];
    const newQuestion = oldQuestion.filter(item => !questions.includes(item))
    if (oldQuestion.length === newQuestion.length) {
        return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: 'ERROR_EXAM_REMOVE_QUESTION' });
    }
    const dataUpdate = {
        question: newQuestion
    }
    return models.exam.update(dataUpdate, {
        where: {
            id: id,
            deleted: 0
        }
    });
};

//Delet exam
exports.delete = async (id) => {
    var delete_option = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    }
    return models.exam.update(delete_option, {
        where: {
            id: id,
            deleted: 0
        }
    })
};

//Get By Id
exports.getById = async (data) => {
    let condition = {
        ...data,
        deleted: 0
    };
    return exam = await models.exam.findOne({
        where: condition
    })
};

//Get All
exports.getAll = async (data) => {
    let condition = {
        deleted: 0,
        ...data.query
    };
    return models.exam.findAll({
        where: condition
    });
};

//Get All Paging
exports.getAllPaging = async (data) => {
    let condition = {
        deleted: 0,
        ...data.query
    };
    delete condition.page_index;
    delete condition.page_size;
    delete condition.name;
    if (data.query?.name) {
        condition.name = {
            [Op.like]: `%${data.query.name}%`,
        }
    }
    return models.exam.findAndCountAll({
        where: condition,
        limit: data.limit,
        offset: data.offset,
        include: [
            {
                model: models.subject,
            }
        ],
        order: [
            ['id', 'DESC'],
        ],
    })
};
