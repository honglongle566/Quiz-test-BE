const examination_roomService = require('../services/examination_roomService');
const {validationResult} = require("express-validator");
const {checkAccessTokenorNot} = require("../middlewares/jwt_token");
const { responseSuccess,responseWithError } = require('../helper/messageResponse');

//Create Exammintaion Room 
exports.create = async(req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        if(req.user.role == 2){
            req.body = { 
                ...req.body,
                exam_id: req.body.exam_id,
                user_id: user.id
            };
            let examination = await examination_roomService.create(req.body);
            res.json(responseSuccess(examination));
        }else{ 
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    };
}