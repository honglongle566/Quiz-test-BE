const models = require('../../models');
const bcrypt = require("bcryptjs");   
const { Op } = require("sequelize");
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
const { ChainCondition } = require('express-validator/src/context-items');
const { assign } = require('nodemailer/lib/shared');
const { matchedData } = require('express-validator');
const {signAccessToken, signRefreshToken} = require('../middlewares/jwt_token');
models.examination_room.hasMany(models.candidate_result_detail, { foreignKey: 'examination_room_id' })
models.candidate.hasMany(models.candidate_result_detail, { foreignKey: 'candidate_id' })
 models.candidate_result_detail.belongsTo(models.examination_room, { foreignKey: "examination_room_id" });
models.exam.hasMany(models.examination_room, { foreignKey: 'exam_id' })
models.examination_room.belongsTo(models.exam, { foreignKey: "exam_id" });
exports.create = async (data) => {
    var check= await models.candidate_result_detail.findOne({
        where: {
            candidate_id: data.candidate_id
        }
    });
    if (check) {return check}
    else {return models.candidate_result_detail.create(data);}
    

};
exports.getById = async (id) => {
    let condition = {
        candidate_id:id,
        deleted: 0
    };
    // console.log("condi",condition);
    let a= await models.candidate_result_detail.findOne({
        where: condition,
        include:{
            model:models.examination_room,
            attributes: ["id"],
            include: [{
                model:models.exam,
            }]
        }
    })
    return a
};
exports.update = async (id, Update) => {
    return models.candidate_result_detail.update(Update, {
        where: {
            candidate_id: id,
            deleted: 0
        }
    });
}