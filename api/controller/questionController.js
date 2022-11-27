const questionService = require('../services/questionService.js');
const { checkAccessTokenorNot } = require('../middlewares/jwt_token');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');

//Create question 
exports.create = async (req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        if (req.user.role == 2) {
            req.body = {
                ...req.body,
                user_id: user.id,
                deleted: 0
            };
            let question = await questionService.create(req.body);
            res.json(responseSuccess(question));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Udpate Question
exports.update = async (req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        const id = req.params.id;
        req.body = {
            ...req.body,
            user_id: user.id
        };
        if (user.role == 2 || user.role == 0) {
            let question = await questionService.update(id, req.body);
            res.json(responseSuccess(true));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Delete Question
exports.delete = async (req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        const id = req.params.id;
        let data = {
            user_id: user.id
        };
        if (user.role == 2 || user.role == 0) {
            let question = await questionService.delete(id);
            res.json(responseSuccess(question));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Get By Id
exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        questionService.getById(id).then((result) => {
            res.json(responseSuccess(result))
        }).catch((err) => {
            res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Get All
exports.getAll = async (req, res) => {
    try {
        const data = req.query;
        questionService.getAll(data).then((data) => {
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
exports.getAllPaging = async (req, res) => {
    try {
        const page = parseInt(req.query.page_index) || 1;
        const size = parseInt(req.query.page_size);
        const { limit, offset } = Paginator.getPagination(page, size);
        const query = req.query ? req.query : null;
        const condition = {
            limit,
            offset,
            query
        };
        await questionService.getAllPaging(condition).then((result) => {
            const response = Paginator.getPagingData(result, page, limit);
            res.json(responseSuccess(response));
        }).catch((err) => {
            console.log(err);
            res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};