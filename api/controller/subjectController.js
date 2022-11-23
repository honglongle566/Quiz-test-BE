const { checkAccessTokenorNot } = require('../middlewares/jwt_token');
const subjectService = require('../services/subjectService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');

exports.create = async (req, res) => {
    try {
        if (req.user.role == 2) {
            let subject = await subjectService.create(req.body);
            res.json(responseSuccess(subject));
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
        if (req.user.role == 2) {
            let subject = await subjectService.update(id, req.body);
            res.json(responseSuccess(subject));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
exports.move = async (req, res) => {
    try {
        const id = req.params.id;
        if (req.user.role == 2) {
            let subject = await subjectService.move(id, req.body);
            res.json(responseSuccess(subject));
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
        if (req.user.role == 2) {
            let groupGuestion = await subjectService.delete(id);
            res.json(responseSuccess(groupGuestion));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
