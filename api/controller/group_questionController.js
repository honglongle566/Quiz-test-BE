const { checkAccessTokenorNot } = require('../middlewares/jwt_token');
const group_questionService = require('../services/group_questionService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');

exports.create = async (req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        if (req.user.role == 2) {
            req.body = {
                ...req.body,
                user_id: user.id
            };
            let groupQuestion = await group_questionService.create(req.body);
            res.json(responseSuccess(groupQuestion));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

exports.update = async (req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        const id = req.params.id;
        req.body = {
            ...req.body,
            user_id: user.id
        };
        if (req.user.role == 2) {
            let groupQuestion = await group_questionService.update(id, req.body);
            res.json(responseSuccess(groupQuestion));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

exports.delete = async (req, res) => {
    try {
        var user = await checkAccessTokenorNot(req);
        const id = req.params.id;
        let data = {
            user_id: user.id
        };
        if (req.user.role == 2) {
            let groupGuestion = await group_questionService.delete(id, data);
            res.json(responseSuccess(groupGuestion));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = req.query;
        group_questionService.getAll(data).then((data) => {
            res.json(responseSuccess(data));
        }).catch((err) => {
            res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));

    }
};

exports.getAllPaging = async (req, res) => {
    try {
        const page = parseInt(req.query.page_index) || 1;
        const size = parseInt(req.query.page_size);
        const { limit, offset } = Paginator.getPagination(page, size);
        const condition = {
            limit,
            offset
        };
        console.log(213, condition);
        await group_questionService.getAllPaging(condition).then((result) => {
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
}