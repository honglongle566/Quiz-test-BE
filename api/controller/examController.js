const examService = require('../services/examService');
const questionService = require('../services/questionService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');

//Create exam
exports.create = async (req, res) => {
    try {
        if (req.user.role == 2 || req.user.role == 0) {
            req.body = {
                ...req.body,
                subject_id: req.body.subject_id,
                user_id: req.user.id
            };
            let exam = await examService.create(req.body);
            res.json(responseSuccess(exam));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

exports.createQuestionByExam = async (req, res) => {
    try {
        const id = req.params.id;
        if (req.user.role == 2) {
            req.body = {
                ...req.body,
                user_id: req.user.id
            };
            const question = await questionService.create(req.body);
            await examService.addQuestionsToExam(id, { questions: [question.dataValues.id] })
            res.json(responseSuccess(question));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Update exam
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        req.body = {
            ...req.body,
            user_id: req.user.id
        };
        if (req.user.role == 2 || req.user.role == 0) {
            let exam = await examService.update(id, req.body);
            res.json(responseSuccess(exam));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

exports.addQuestionsToExam = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            ...req.body,
            user_id: req.user.id
        };
        if (req.user.role == 2) {
            let exam = await examService.addQuestionsToExam(id, data);
            res.json(responseSuccess(exam));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

exports.removeQuestionsToExam = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            ...req.body,
            user_id: req.user.id
        };
        if (req.user.role == 2) {
            let exam = await examService.removeQuestionsToExam(id, data);
            res.json(responseSuccess(exam));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Delete exam
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        let data = {
            user_id: req.user.id
        };
        if (req.user.role == 2 || req.user.role == 0) {
            let exam = await examService.delete(id, data);
            res.json(responseSuccess(exam));
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
        const data = {
            user_id: req.user.id,
            id: req.params.id
        };
        examService.getById(data).then((result) => {
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
exports.getAll = async (req, res) => {
    try {
        const data = { user_id: req.user.id };
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
exports.getAllPaging = async (req, res) => {
    try {
        const page = parseInt(req.query.page_index) || 1;
        const size = parseInt(req.query.page_size);
        const { limit, offset } = Paginator.getPagination(page, size);
        const query = req.query ? { ...req.query, user_id: req.user.id } : { user_id: req.user.id };
        const condition = {
            limit,
            offset,
            query
        };
        await examService.getAllPaging(condition).then((result) => {
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