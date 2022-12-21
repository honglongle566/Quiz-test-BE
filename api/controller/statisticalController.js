const questionService = require('../services/questionService.js');
const examination_roomService= require('../services/examination_roomService');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const { validationResult } = require('express-validator');
const { responseSuccess, responseWithError } = require('../helper/messageResponse');
const { ErrorCodes } = require('../helper/constants');
const { condition } = require('sequelize');
const { examination_room } = require('../../models');
const moment = require('moment')

// Đợt thi
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds ;
  }

exports.get = async (req, res) => {
    try {
      
       var a= await examination_roomService.getAllS();
      
       let arr=[]
       await Promise.all(a.map(async (pro,index) => {
       arr[index]={};
       arr[index].id= pro.id;
       arr[index].name=pro.name;
       arr[index].total_candidate= pro.candidates.length;
       arr[index].total_candidate_done=0;
       arr[index].score=0;
       arr[index].time=0
       
       let total_score=0;
       await Promise.all( pro.candidates.map(async(p)=>{
        if ( (p.candidate_result_details.length) !== 0){
            //console.log(p.candidate_result_details);
            let b=p.candidate_result_details
         if (b[0].dataValues.time_end){
            console.log(1222);
            arr[index].total_candidate_done+=1
            total_score+=b[0].dataValues.score
            console.log("abc",b[0].dataValues.time_end.getTime()-b[0].dataValues.time_start.getTime());
            arr[index].time+= (b[0].dataValues.time_end.getTime()-b[0].dataValues.time_start.getTime())
         }
        }
       }
       ))
       arr[index].score= total_score/arr[index].total_candidate_done;
       arr[index].time=arr[index].time/arr[index].total_candidate_done;
       arr[index].time=msToTime( arr[index].time)

       }))
       res.json(responseSuccess(arr));
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
exports.get1 = async (req, res) => {
    try {
      
       var a= await examination_roomService.getAllS();
      
       let arr=[]
       await Promise.all(a.map(async (pro,index) => {
       arr[index]={};
       arr[index].id= pro.id;
       arr[index].name=pro.exam.name;
       arr[index].total_candidate= pro.candidates.length;
       arr[index].total_candidate_done=0;
       arr[index].score=0;
       arr[index].time=0
       
       let total_score=0;
       await Promise.all( pro.candidates.map(async(p)=>{
        if ( (p.candidate_result_details.length) !== 0){
            //console.log(p.candidate_result_details);
            let b=p.candidate_result_details
         if (b[0].dataValues.time_end){
            console.log(1222);
            arr[index].total_candidate_done+=1
            total_score+=b[0].dataValues.score
            console.log("abc",b[0].dataValues.time_end.getTime()-b[0].dataValues.time_start.getTime());
            arr[index].time+= (b[0].dataValues.time_end.getTime()-b[0].dataValues.time_start.getTime())
         }
        }
       }
       ))
       arr[index].score= total_score/arr[index].total_candidate_done;
       arr[index].time=arr[index].time/arr[index].total_candidate_done;
       arr[index].time=msToTime( arr[index].time)

       }))
       res.json(responseSuccess(arr));
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
exports.getById = async (req, res) => {
    try {
        
       var a= await examination_roomService.getByIdS(req.params.id);
      
       let arr=[]
       await Promise.all(a.map(async (pro,index) => {
       arr[index]={};
       arr[index].id= pro.id;
       arr[index].name=pro.name;
       arr[index].total_candidate= pro.candidates.length;
       arr[index].total_candidate_done=0;
       arr[index].score=0;
       arr[index].time=0
       
       let total_score=0;
       await Promise.all( pro.candidates.map(async(p)=>{
        if ( (p.candidate_result_details.length) !== 0){
            //console.log(p.candidate_result_details);
            let b=p.candidate_result_details
         if (b[0].dataValues.time_end){
            console.log(1222);
            arr[index].total_candidate_done+=1
            total_score+=b[0].dataValues.score
            console.log("abc",b[0].dataValues.time_end.getTime()-b[0].dataValues.time_start.getTime());
            arr[index].time+= (b[0].dataValues.time_end.getTime()-b[0].dataValues.time_start.getTime())
         }
        }
       }
       ))
       arr[index].score= total_score/arr[index].total_candidate_done;
       arr[index].time=arr[index].time/arr[index].total_candidate_done;
       arr[index].time=msToTime( arr[index].time)

       }))
       res.json(responseSuccess(arr));
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err, 'error' || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};