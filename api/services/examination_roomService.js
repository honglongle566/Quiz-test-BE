const { examination_room } = require('../../models');
const models = require('../../models');
const messageConstants = require('../constant/messageConstants');
const { ErrorCodes } = require('../helper/constants');

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
exports.update = async(data) => { 
    
}
//Delete
exports.delete = async(id) => {
        
}
