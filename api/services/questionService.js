const models = require("../../models");
const { ErrorCodes } = require("../helper/constants.js");
const { question } = require("../../models");
const messageConstants = require("../constant/messageConstants");

//Create question
exports.create = async (question) => {
  let checkExistingName = await models.question.findOne({
    where: {
      name: question.name,
      deleted: 0
    }
  });
  if (!checkExistingName ) {
    return models.question.create(question);
  } else {
    return Promise.reject({
      status: ErrorCodes.ERROR_CODE_ITEM_EXIST,message: messageConstants.QUESTION_EXIST_NAME,
    });
  }
};

//Update question
exports.update = async (id, questionUpdate) => {
  let question = await models.question.update(questionUpdate, {
    where: {
      id: id,
      deleted: 0,
    },
  });
  if(question){
    return true;
  }else{
    return false;
  }
};

//Delete question
exports.delete = async (id) => {
  var option_delete = {
    field: "deleted",
    deleted: 1,
    updated_date: new Date(),
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
        where : condition
    });
};

//Get All Paging
exports.getAllPaging = async(data) => { 
    let condition = { 
        deleted: 0
    };
    if(data.type) { 
        condition.type = data.type;
    };
    return models.question.findAndCountAll({
        where: condition
    })
}
