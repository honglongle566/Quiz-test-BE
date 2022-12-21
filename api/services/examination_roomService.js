const { examination_room } = require('../../models');
const models = require('../../models');
const messageConstants = require('../constant/messageConstants');
const { ErrorCodes } = require('../helper/constants');
const { Op } = require("sequelize");
models.examination_room.belongsTo(models.exam, { foreignKey: "exam_id" });
models.candidate_result_detail.belongsTo(models.examination_room, { foreignKey: "examination_room_id" });
models.candidate_result_detail.belongsTo(models.candidate, { foreignKey: "candidate_id" });
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
exports.getById = async (id, user_id) => {
    let condition = {
        id: id,
        user_id: user_id,
        deleted: 0
    };
    return models.examination_room.findOne({
        where: condition,
        include: [
            {
                model: models.exam,
            }
        ]
    })
};
exports.getById1 = async (id) => {
    let condition = {
        id: id,
        deleted: 0
    };
    return models.examination_room.findOne({
        where: condition,
        include: [
            {
                model: models.exam,
                attributes: ['id', 'question']
            }
        ]
    })
};
//Get By Id
exports.getExamQuestion = async (link_room_exam) => {
    let condition = {
        link_room_exam: link_room_exam,
        deleted: 0
    };
    const exam_room = await models.examination_room.findOne({
        where: condition,
        include: [
            {
                model: models.exam,
            }
        ]
    })
    const exam_roomJSON = JSON.parse(JSON.stringify(exam_room))
    let questionDB = await models.question.findAll({
        where: {
            id: {
                [Op.in]: exam_roomJSON?.exam?.question || [],
            },
        },
        attributes: ['answer', 'matching_answers', 'id', 'name', 'type', 'has_mul_correct_answers', 'fill_blank_correct_answer']
    })
    questionDB = JSON.parse(JSON.stringify(questionDB))
    let questions = []
    if (questionDB?.length) {
        questions = exam_roomJSON?.exam?.question.map(item => questionDB.find(x => x.id == item))
    }
    const questionJSON = JSON.parse(JSON.stringify(questions)).map((item, index) => {
        if (item.type === 4) {
            item.fill_blank_correct_answer = item.fill_blank_correct_answer.map(answer => ({ key: answer.key }))
        }
        return { ...item, index: index + 1 }
    })
    const listQuestion = questionJSON.map((item, index) => ({ id: item.id, name: item.name, type: item.type, index: index + 1 }))
    return { exam_room: exam_roomJSON, questions: questionJSON, list_question: listQuestion }
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
exports.getAllS = async (data) => {
    let condition = {
        deleted: 0,
    };

    return models.examination_room.findAll({
        where: condition,
           include: [
            {
                model: models.candidate,
               include: [
                {
                    model: models.candidate_result_detail,
                }
               ]
               
            },
            {
                model: models.exam,
            }

        ]

    });
};
exports.getByIdS = async (id) => {
    let condition = {
        deleted: 0,
        id:id,
    };

    return models.examination_room.findAll({
        where: condition,
           include: [
            {
                model: models.candidate,
               include: [
                {
                    model: models.candidate_result_detail,
                }
               ]
               
            }
        ]

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