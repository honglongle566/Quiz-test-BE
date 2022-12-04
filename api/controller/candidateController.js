const { checkAccessTokenorNot } = require('../middlewares/jwt_token');
const candidateService = require('../services/candidateService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize'); 


exports.create = async(req, res) => {
    try {   
        console.log(111112222);
        var user = await checkAccessTokenorNot(req);
        if(user.role==2||user.role==0){

            let data = await candidateService.create(req.body);
            let result= await candidateService.login(data.dataValues);


            res.json(responseSuccess(result));
        }else{
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};