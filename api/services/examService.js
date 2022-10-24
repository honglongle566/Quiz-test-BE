const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const messageConstants = require('../constant/messageConstants');
models.exam.belongsTo(models.user,{ foreignKey: "user_id"});

//Create exam
exports.create = async (data) => {
    return models.exam.create(data);
};