const candidateService = require('../services/candidateService');
const examination_roomService =require('../services/examination_roomService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');


exports.create = async (req, res) => {
    try {
        let examination_room= await examination_roomService.getById1(req.body.examination_room_id);
        let a= examination_room.time_limit;

        let date= new Date();
        if (date< new Date(a[0]) || date>new Date(a[1])) {
            res.json(responseWithError( ErrorCodes.ERROR_CODE_TIME_LIMIT,'nằm ngoài thời gian thi'))
        } else{
             const candidate = await candidateService.register(req.body);
        res.json(responseSuccess(candidate));
        }
        
        //const candidate = await candidateService.register(req.body);
        // res.json(responseSuccess(candidate));
        // res.json(responseSuccess(a));
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};