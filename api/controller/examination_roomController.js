const examination_roomService = require('../services/examination_roomService');
const {validationResult} = require("express-validator");
const {checkAccessToeknorNot} = require("../middlewares/jwt_token")
exports.create = async(req, res) => {
    var user = await checkAccessToeknorNot(req);
}