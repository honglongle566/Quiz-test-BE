const models = require("../../models");
const { ErrorCodes } = require("../helper/constants.js");
const { question } = require("../../models");
const messageConstants = require("../constant/messageConstants");
const { Op } = require("sequelize");

//Create question
exports.create = async (question) => {
  return models.question.create(question);
};

//Update question
exports.update = async (id, questionUpdate) => {
  let question = await models.question.update(questionUpdate, {
    where: {
      id: id,
      deleted: 0,
    },
  });
  if (question) {
    return true;
  } else {
    return false;
  }
};

//Delete question
exports.delete = async (id) => {
  var option_delete = {
    field: "deleted",
    deleted: 1,
    updated_date: Date()
  };
  return models.question.update(option_delete, {
    where: {
      id: id,
      deleted: 0,
    },
  });
};

//Get By Id
exports.getById = async (id) => {
  let condition = {
    deleted: 0,
    id,
  };
  return models.question.findOne({
    where: condition,
  });
};

//Get All
exports.getAll = async (data) => {
  let condition = {
    deleted: 0,
  };
  if (data.type) {
    condition.type = data.type;
  };
  return models.question.findAll({
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
  return models.question.findAndCountAll({
    where: condition,
    limit: data.limit,
    offset: data.offset,
    order: [
      ['id', 'DESC'],
    ],
  })
}
