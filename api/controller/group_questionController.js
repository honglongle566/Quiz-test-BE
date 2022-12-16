const group_questionService = require('../services/group_questionService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');

exports.create = async (req, res) => {
    try {
        if (req.user.role == 2) {
            req.body = {
                ...req.body,
                user_id: req.user.id
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
        const id = req.params.id;
        req.body = {
            ...req.body,
            user_id: req.user.id
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
        const id = req.params.id;
        let data = {
            user_id: req.user.id
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
        const data = {
            ...req.query,
            user_id: req.user.id
        };
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
        const keyword = req.query.keyword || ''
        const { limit, offset } = Paginator.getPagination(page, size);
        const condition = {
            limit,
            offset
        };
        await group_questionService.getAllPaging(condition, keyword, req.user.id).then((result) => {
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