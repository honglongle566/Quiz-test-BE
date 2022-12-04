const { examination_room } = require('../../models');
const models = require('../../models');
const messageConstants = require('../constant/messageConstants');
const { ErrorCodes } = require('../helper/constants');
models.examination_room.belongsTo(models.exam,{ foreignKey: "exam_id"});
//Create
exports.create = async(examination_room) => { 
    var checkNameExisting = await models.examination_room.findOne({
        where: { 
            name: examination_room.name,
            deleted: 0
        }
    });
    if(!checkNameExisting){
        return models.examination_room.create(examination_room);
    }else{ 
        return Promise.reject({status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.EXAMINATION_EXIT_NAME})
    }
};

//Update
exports.update = async(id, examinationUpdate) => { 
    return models.examination_room.update(examinationUpdate,{
        where: {
            id: id,
            deleted: 0
        }
    });
}
//Delete
exports.delete = async(id) => {
    var delete_option = {
        field: "deleted",
        deleted: 1,
        updated_date: Date()
    }
    return models.examination_room.update(delete_option,{
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
    return models.examination_room.findOne({
        where:condition
    })
};

//Get All
exports.getAll = async(data) => {
    let condition = { 
        deleted : 0,
        ...data
    };
   
    return models.examination_room.findAndCountAll({
        where: condition,
       
    });
};

//Get All Paging
exports.getAllPaging = async(data) => {
    let condition = { 
        deleted: 0,
        ...data.query
    };
    delete condition.page_index;
    delete condition.page_size;
    console.log("condition",condition);
    return models.examination_room.findAndCountAll({
        where: condition,
        include:[
            {
                model: models.exam,
              
            }
        ],
        limit: data.limit,
        offset: data.offset,
    })
};