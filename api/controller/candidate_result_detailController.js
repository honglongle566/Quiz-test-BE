const { checkAccessTokenorNot } = require('../middlewares/jwt_token');
const candidateResultDetailService = require('../services/candidate_result_detailService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize'); 


exports.create = async(req, res) => {
    try {   
        req.body.candidate_id= req.user.id
        console.log(111112222);
        var user = await checkAccessTokenorNot(req);
            let data= await candidateResultDetailService.create(req.body)
            res.json(responseSuccess(data));
       
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};