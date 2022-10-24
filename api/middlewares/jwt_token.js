const models = require('../../models');
const jwt = require("jsonwebtoken");
const { ErrorCodes } = require('../helper/constants');
const { responseSuccess, responseWithError } = require("../helper/messageResponse");



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
        }, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    }
};

exports.signRefreshToken = (req, res, next) => {
    try {
        return jwt.sign({
            iss:'user',
            id: req.id,
            email: req.email,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 7)
        }, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    };
};

exports.checkAccessToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decodedToken.user_id?decodedToken.user_id:null;
        let user = await models.user.findOne({
            where: {
                id: decodedToken.id,
                // user_id: user_id
            },
            attributes:[
                'id',
                'type',
                'full_name',
                'user_name',
                'phone',
                'email',
                'role'
            ]
        });
        user = user ? {
            id: user.id,
            full_name: user.full_name,
            user_name: user.user_name,
            role: user.role,
            email: user.email,
            phone: user.phone,
            type: user.type,
        }: null
        req.user = user;
        // const permission = await checkPermission(req.user.type);
        // req.permission = permission;
        next();
    }catch(err){
        res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    }
};

exports.checkAccessTokenorNot = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return null;
        } else {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            let user = await models.user.findOne({
                where: {
                    Id: decodedToken.id,
                    Email: decodedToken.email ? decodedToken.email : null
                },
                attributes: [
                    'Id',
                    'UserName',
                    'Type',
                    'Email'
                ]
            });
            user = user ? {
                id: user.id,
                user_name: user.user_name,
                email: user.email,
                type: user.type,
                is_user: 1
            } : null
            let customer = await models.customers.findOne({
                where: {
                    Id: decodedToken.id,
                    Email: decodedToken.email ? decodedToken.email : null,
                    EcommerceId: decodedToken.ecommerce_id ? decodedToken.ecommerce_id : null
                },
                attributes: [
                    'id',
                    'user_name',
                    'type',
                    'email'
                ]
            });
            customer = customer ? {
                id: customer.Id,
                user_name: customer.UserName,
                email: customer.Email,
                type: customer.Type,
                is_customer: 1
            } : null
            const response = user ? user : customer;
            return response;
        }
    } catch (err) {
        return res.json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid or expired token provided!", err.message));
    }
};

exports.checkAdmin = (req,res, next) => {
    try { 
        if(req.user.role == 1 ) { 
            next();
        }else{
            res.status(403).json({message: "Not Allowed!"})
        }
    }catch(err){
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
            })
        }
};



exports.checkUser = (req,res,next) => {
    try { 
        if(req.user.role == 0) {
            next();
        }else{
            res.status(403).json({message: "Not Allowed!"})
        }
    }catch(err){
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
}
