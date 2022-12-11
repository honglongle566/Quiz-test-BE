const models = require('../../models');
const jwt = require("jsonwebtoken");
const { ErrorCodes } = require('../helper/constants');
const { responseSuccess, responseWithError } = require("../helper/messageResponse");

exports.checkAccessToken = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]
        if (!token)
            res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Access token not found"));
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let user = await models.user.findOne({
            where: {
                id: decoded.userId,
            },
            attributes: [
                'id',
                'full_name',
                'user_name',
                'phone',
                'email',
                'role'
            ]
        });
        req.user = user;
        next();
    } catch (err) {
        res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    }
};

exports.checkAccessTokenCandidate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]
        if (!token)
            res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Access token not found"));
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let candidate = await models.user.findOne({
            where: {
                id: decoded.candidateId,
            },
            attributes: [
                'id',
                'full_name',
                'phone',
                'email',
                'group',
                'identify_code',
                'score',
                'examination_room_id',
            ]
        });
        req.candidate = candidate;
        next();
    } catch (err) {
        res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    }
};

exports.checkAdmin = (req, res, next) => {
    try {
        if (req.user.role == 1) {
            next();
        } else {
            res.status(403).json({ message: "Not Allowed!" })
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
};

exports.checkAdmin2 = (req, res, next) => {
    try {
        if (req.user.role == 2) {
            next();
        } else {
            res.status(403).json({ message: "Not Allowed!" })
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
}


exports.checkUser = (req, res, next) => {
    try {
        if (req.user.role == 0) {
            next();
        } else {
            res.status(403).json({ message: "Not Allowed!" })
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
}

exports.signAccessToken = (req, res, next) => {
    try {
        return jwt.sign({
            iss: 'user',
            id: req.id,
            role: req.role,
            user_name: req.user_name,
            full_name: req.full_name,
            email: req.email,
            avatar: req.avatar,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, "" + process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        console.log(err);
        res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    }
};

exports.signRefreshToken = (req, res, next) => {
    try {
        return jwt.sign({
            iss: 'user',
            id: req.id,
            email: req.email,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 7)
        }, "" + process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    };
};
