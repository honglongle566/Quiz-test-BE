const candidateResultDetailService = require('../services/candidate_result_detailService');
const candidateService = require('../services/candidateService');
const examService = require('../services/examService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');
const { candidate } = require('../../models');


exports.create = async (req, res) => {
    try {
        req.body.candidate_id = req.user.id
        console.log(111112222);
        let data = await candidateResultDetailService.create(req.body);

        let exam = await candidateResultDetailService.getById(data.id);

        let detailexam = exam.examination_room.exam;
        let arr1 = detailexam.question;
        let arr2 = exam.answer_detail;
        var total_score = 0;
        var total = 0

        for (let i = 0; i < arr1.length; i++) {
            // console.log("abc",arr1[i].correct_answers,arr2[i].answers);

            if (arr1[i].type == 1) {
                if (JSON.stringify(arr1[i].correct_answers) == JSON.stringify(arr2[i].answers)) {
                    total_score += arr1[i].score;
                    total += arr1[i].score;
                    continue;
                }
            }
            if (arr1[i].type == 2) {
                if (JSON.stringify(arr1[i].correct_answers) == JSON.stringify(arr2[i].answers)) {
                    total_score += arr1[i].score;
                    total += arr1[i].score;
                    continue;
                }
            }
            if (arr1[i].type == 3) {
                if (JSON.stringify(arr1[i].matching_correct_answers) == JSON.stringify(arr2[i].answers)) {
                    total_score += arr1[i].score;
                    total += arr1[i].score;
                    continue;
                }
            }
            if (arr1[i].type == 4) {
                if (JSON.stringify(arr1[i].fill_blank_correct_answers) == JSON.stringify(arr2[i].answers)) {
                    total_score += arr1[i].score;
                    total += arr1[i].score;
                    continue
                }
            }
            total += arr1[i].score;
        }
        console.log("total", total_score, total);
        let score = (total_score / total * 10).toFixed(1)
        let result = await candidateService.update(data.candidate_id, { score: score })
        res.json(responseSuccess(result));

    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
