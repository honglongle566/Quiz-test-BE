const models = require('../../models');

//Create
exports.create = async(data) => { 
    return models.examination_room.create(data);
};

//Update
exports.update = async(data) => { 

}
//Delete
exports.delete = async(id) => {
        
}
