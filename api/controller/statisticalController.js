const questionService = require('../services/questionService.js');
const examination_roomService= require('../services/examination_roomService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');
const { examination_room } = require('../../models');

// Đợt thi

exports.get = async (req, res) => {
    try {
       let a= await examination_roomService.getAllS();
       let arr=[]
       await Promise.all(a.map(async (pro,index) => {
       arr[index]={};
       arr[index].id= pro.id;
       arr[index].total_candidate= pro.candidates.length;
       arr[index].total_candidate_done=0;
       await Promise.all( pro.candidates.map(async(p)=>{
        if (p.candidate_result_details){
            console.log(index);
         if (p.candidate_result_details.time_end){
            console.log(1222);
            arr[index].total_candidate_done+=1
         }}
       }))
       }))
       res.json(responseSuccess(a));
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};