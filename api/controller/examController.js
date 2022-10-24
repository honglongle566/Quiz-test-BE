const { checkAccessTokenorNot } = require('../middlewares/jwt_token');
const examService = require('../services/examService');
// const messageConstants = require('../constant/messageConstants');
// const Pagiantor = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const {ErrorCodes} = require('../helper/constants');
const { condition } = require('sequelize');
const { user } = require('../../models');

//Create exam
exports.create = async(req, res) => {
    try {
        // var user = await checkAccessTokenorNot(req)
        // if(req.user.role == 2){
        //     req.body = {
        //         ...req.bdody,
        //         user_id: user
        //     };
        //     let data = await examService.create(req.body);
        //     res.json(responseSuccess(data));
        // }
        let data =  await examService.create(req.body);
        res.json(responseSuccess(data));
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
}