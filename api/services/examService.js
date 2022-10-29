const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
models.exam.belongsTo(models.user,{ foreignKey: "user_id"});

//Create exam
exports.create = async (exam) => {
    var checkNameExisting = await models.exam.findOne({
        where: {
            name: exam.name,
            deleted: 0
        }
    });
    if (!checkNameExisting) {
        return models.exam.create(exam);
    } else {
        return Promise.resolve({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.EXAM_EXIST_NAME });
    }
};


//Update exam
exports.update = async(id, examUpdate) => {
    return models.exam.update(examUpdate,{
        where: {
            id: id,
            deleted: 0
        }
    });
};

//Delet exam
exports.delete = async(id) => {
    var delete_option = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    }
    return models.exam.update(delete_option,{
        where: {
            id: id,
            deleted: 0
        }
    })
};

//Get By Id
exports.getById = async(id) => {
    let condition = {
        id: id,
        deleted: 0
    };
    return models.exam.findOne({
        where:condition
    })
};

//Get All
exports.getAll = async(data) => {
    let condition = { 
        deleted : 0
    };
    return models.exam.findAll({
        data,
        where: condition
    });
};

//Get All Paging
exports.getAllPaging = async() => {
    let condition = { 
        deleted: 0
    };
    return models.exam.findAndCountAll({
        where: condition
    })
};