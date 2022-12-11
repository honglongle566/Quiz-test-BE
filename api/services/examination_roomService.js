const { examination_room } = require('../../models');
const models = require('../../models');
const messageConstants = require('../constant/messageConstants');
const { ErrorCodes } = require('../helper/constants');
const { Op } = require("sequelize");
models.examination_room.belongsTo(models.exam, { foreignKey: "exam_id" });
//Create
exports.create = async (examination_room) => {
    return models.examination_room.create(examination_room);
};

//Update
exports.update = async (id, examinationUpdate) => {
    return models.examination_room.update(examinationUpdate, {
        where: {
            id: id,
            deleted: 0
        }
    });
}
//Delete
exports.delete = async (id) => {
    var delete_option = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    }
    return models.examination_room.update(delete_option, {
        where: {
            id: id,
            deleted: 0
        }
    })
};

//Get By Id
exports.getById = async (id) => {
    let condition = {
        id: id,
        deleted: 0
    };
    const exam_room = await models.examination_room.findOne({
        where: condition,
        include: [
            {
                model: models.exam,
                attributes: ['id', 'question']
            }
        ]
    })
    const exam_roomJSON = JSON.parse(JSON.stringify(exam_room))
    const questions = await models.question.findAll({
        where: {
            id: {
                [Op.in]: exam_roomJSON?.exam?.question || [],
            }
        }
    })
    const questionJSON = JSON.parse(JSON.stringify(questions))
    return { ...exam_roomJSON, questions: questionJSON }
};

exports.getInfoCollect = async (link_room_exam) => {
    const condition = {
        link_room_exam: link_room_exam,
        deleted: 0
    };
    return models.examination_room.findOne({
        where: condition,
    })
};

//Get All
exports.getAll = async (data) => {
    let condition = {
        deleted: 0,
        ...data
    };

    return models.examination_room.findAndCountAll({
        where: condition,

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
    return models.examination_room.findAndCountAll({
        where: condition,
        include: [
            {
                model: models.exam,

            }
        ],
        limit: data.limit,
        offset: data.offset,
    })
};