const examination_roomService = require('../services/examination_roomService');
const { validationResult } = require("express-validator");
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const messageConstants = require('../constant/messageConstants');
const { ErrorCodes } = require('../helper/constants');
const Paginator = require('../commons/paginator');

//Create Exammintaion Room 
exports.create = async (req, res) => {
    try {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        if (req.user.role == 2 || req.user.role == 0) {
            req.body = {
                ...req.body,
                exam_id: req.body.exam_id,
                user_id: req.user.id,
                link_room_exam: result
            };
            let examination = await examination_roomService.create(req.body);
            res.json(responseSuccess(examination));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    };
};

//Update Examination Room
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        req.body = {
            ...req.body,
            user_id: req.user.id
        };
        if (req.user.role == 2 || req.user.role == 0) {
            let exam = await examination_roomService.update(id, req.body)
            res.json(responseSuccess(exam));
        } else {
            res.json('Not Allowed!!!');
        }
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Delete Examination Room
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        let data = {
            user_id: req.user.id
        };
        if (req.user.role == 2 || req.user.role == 0) {
            let exam = await examination_roomService.delete(id, data);
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
        try {
            const id = req.params.id;
            examination_roomService.getById(id).then((result) => {
                res.status(200).json({ success: true, code: 0, message: messageConstants.EXAMINATION_FOUND, data: result });
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
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
exports.getExamQuestion = async (req, res) => {
    try {
        try {
            const link_room_exam = req.params.id;
            examination_roomService.getExamQuestion(link_room_exam).then((result) => {
                res.status(200).json({ success: true, code: 0, message: messageConstants.EXAMINATION_FOUND, data: result });
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
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

exports.getInfoCollect = async (req, res) => {
    try {
        try {
            const link_room_exam = req.params.id;
            examination_roomService.getInfoCollect(link_room_exam).then((result) => {
                res.status(200).json({ success: true, code: 0, message: messageConstants.EXAMINATION_FOUND, data: result });
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
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};

//Get All
exports.getAll = async (req, res) => {
    try {
        const data = req.query;
        examination_roomService.getAll(data).then((data) => {
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
        await examination_roomService.getAllPaging(condition).then((result) => {
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