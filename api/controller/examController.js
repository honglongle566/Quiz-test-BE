const { checkAccessTokenorNot } = require('../middlewares/jwt_token');
const examService = require('../services/examService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const {ErrorCodes} = require('../helper/constants');
const { condition } = require('sequelize');

//Create exam
exports.create = async(req, res) => {
    try {   
        var user = await checkAccessTokenorNot(req);
        if(req.user.role == 2){
            req.body = {
                ...req.body,
                subject_id: req.body.subject_id,
                user_id: user.id
            };
            let exam = await examService.create(req.body);
            res.json(responseSuccess(exam));
        }else{
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Update exam
exports.update = async(req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        const id = req.params.id;
        req.body = {
            ...req.body,
            user_id: user.id
        };
        if(req.user.role == 2){
            let exam = await examService.update(id,req.body);
            res.json(responseSuccess(exam));
        }else{
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Delete exam
exports.delete = async(req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        const id = req.params.id;
        let data = {
            user_id: user.id
        };
        if(req.user.role == 2){
            let exam = await examService.delete(id, data);
            res.json(responseSuccess(exam));
        }else{
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Get By Id
exports.getById = async(req, res) => {
    try {
        const id = req.params.id;
        examService.getById(id).then((result) => {
            res.status(200).json({ success: true, code: 0, message: messageConstants.EXAM_FOUND, data: result });
        }).catch((err) => {
            res.send({
                error: {
                    status: err.status || 500,
                    message: err.message
                }
            });
        });
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Get all
exports.getAll = async(req, res) => {
    try {
        const data = req.query;
        examService.getAll(data).then((data) => {
            res.json(responseSuccess(data));
        }).catch((err) => {
            res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));

    }
};

//Get All Paging
exports.getAllPaging = async(req, res) => {
    try {
        console.log(11111);
        const page = parseInt(req.query.page_index) || 1;
        const size = parseInt(req.query.page_size);
        const { limit, offset } = Paginator.getPagination(page, size);
        const condition = {
            limit,
            offset
        };
        console.log("condition", condition);
        await examService.getAllPaging(condition).then((result) => {
            const response = Paginator.getPagingData(result, page, limit);
            const examRes = response.rows.map(item => {
                return item;
            });
            res.json(responseSuccess(examRes));
        }).catch((err) => {
            console.log(err);
            res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
}