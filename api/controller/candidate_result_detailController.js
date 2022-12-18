const candidateResultDetailService = require('../services/candidate_result_detailService');
const candidateService = require('../services/candidateService');
const examService = require('../services/examService');
const questionService= require('../services/questionService')
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');
const { candidate } = require('../../models');

// exports.start= async(req,res) =>{
//     try {
//         // let id= req.user.id;
//         // // let data1= await candidateService.getById(id);
//         // let a= new Date();
//         // let candidate= 
//         // let data = await candidateResultDetailService.update(id,{start_time: a});
        
//     } catch (err) {
//         console.log(err);
//         res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
//     }
// }


exports.create = async (req, res) => {
    try {
        console.log(111);
        let candidate_id = req.candidate.id
        console.log(req.body.question);
        let candidate= await candidateService.getById(candidate_id);
        let candidateResult= {
            candidate_id:candidate_id,
            time_start: new Date(),
            examination_room_id: candidate.examination_room_id
        }
        let data = await candidateResultDetailService.create(candidateResult);
        res.json(responseSuccess(data));

    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
exports.update=async (req,res)=>{
    try {
        let candidate_id = req.candidate.id
        let data= await candidateResultDetailService.getById(candidate_id);
        
        let array= data.examination_room.exam.question;
        console.log("abc",array);
        let question= await questionService.getByArray(array);


       
        let arr1 = question;
        let arr2 =req.body.list_answer;
        var total_score = 0;
        var total = 0;
        var total_question=arr1.length;
        var total_right=0;
        var total_null=0;

        for (let i = 0; i < arr1.length; i++) {
            total += arr1[i].score;
            if (arr2[i+1]) {
            if (arr1[i].type == 1) {
                console.log("a",JSON.stringify(arr1[i].correct_answer) ,JSON.stringify(arr2[i+1]));
                if (JSON.stringify(arr1[i].correct_answer) == JSON.stringify(arr2[i+1])) {
                    total_score += arr1[i].score;
                    total_right+=1;
                    // total += arr1[i].score;
                    continue;
                }
            }
            if (arr1[i].type == 2) {
                if (JSON.stringify(arr1[i].correct_answer) == JSON.stringify(arr2[i+1])) {
                    total_score += arr1[i].score;
                    total_right+=1;
                    // total += arr1[i].score;
                    continue;
                }
            }
            if (arr1[i].type == 3) {
                if (JSON.stringify(arr1[i].matching_correct_answer) == JSON.stringify(arr2[i+1])) {
                    total_score += arr1[i].score;
                    total_right+=1;
                    // total += arr1[i].score;
                    continue;
                }
            }
            if (arr1[i].type == 4) {
                if (JSON.stringify(arr1[i].fill_blank_correct_answer) == JSON.stringify(arr2[i+1])) {
                    total_score += arr1[i].score;
                    total_right+=1;
                    // total += arr1[i].score;
                    continue
                }
            }
        } else {
          total_null+=1;
          continue;
        }
    } 
        
        console.log("total", total_score, total,total_null,total_right);
        var result = (total_score / total * 100).toFixed(1);
        var time_end= new Date();
        let b= time_end;
        b.setTime(b.getTime() + 30*1000);
        let a= new Date(data.time_start)
        console.log("chưa",a);
        a.setTime(a.getTime() + data.examination_room.exam.time_limit*60*1000);
        console.log("aaaa",a, time_end);
        if (b>a){
              res.json(responseWithError( ErrorCodes.ERROR_CODE_TIME_LIMIT,'Bạn đã vượt quá thời gian cho phép'))
        } else{
            var update={
                total_null: total_null,
                max_score: total,
                total_question: total_question,
                total_right:total_right,
                score: total_score,
                result: result,
                time_end: time_end,
                answer_detail: req.body.list_answer
            }
            let result1 = await candidateResultDetailService.update(candidate_id, update)
            res.json(responseSuccess());

        }

       
        
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
}

