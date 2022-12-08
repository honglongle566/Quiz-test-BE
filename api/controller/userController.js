const userService = require("./../services/userService");
const mailService = require("../services/mail");
const transporter = require('../helper/nodeMailer');
const messageConstants = require("../constant/messageConstants");
const { validationResult } = require("express-validator");
const { responseSuccess, responseWithError, } = require("../helper/messageResponse");
const fs = require("fs");
const bcrypt = require('bcryptjs');
const { ErrorCodes } = require("./../helper/constants");
const jwt = require('jsonwebtoken');
const { user } = require("../../models");
const { signAccessToken, signRefreshToken } = require("../middlewares/jwt_token");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const models = require('../../models');

//Người dùng đăng ký tài khoản
exports.getUser = async (req, res) => {
    try {
        return res.json({ success: true, user: req?.user })
        const user = await userService.getUser(req.user)
        if (!user)
            res.json(responseWithError(404, 'error', 'User not found'));
        res.json({ success: true, user })
    } catch (err) {
        console.log(err)
        res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
};
exports.register = async (req, res, next) => {
    try {
        const data = await userService.register(req.body)
        res.json(responseSuccess(data))
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

//Người dùng đăng nhập
exports.login = async (req, res) => {
    try {
        let data = await userService.login(req.body);
        res.json(responseSuccess(data))
    } catch (err) {
        console.log(err);
        res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }

};

//Cập nhật thông tin người dùng
exports.update = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const id = req.params.id;
        console.log(id);
        userService.update(id, req.body).then((result) => {
            if (result.message && result == false) {
                res.status(404).json({ success: false, code: 1, message: result.message });
            } else {
                res.status(200).json({ success: true, code: 0, message: messageConstants.USER_UPDATE_SUSSCESS, data: result });
            }
        }).catch((err) => {
            res.send({
                code: 1,
                error: {
                    status: err.status || 500,
                    message: err.message
                }
            });
        });
    } catch (err) {
        return next(err);
    }
};

//Xoá tài khoản người dùng
exports.delete = async (req, res) => {
    const id = req.params.id;
    userService.delete(id).then((result) => {
        if (result == 1) {
            res.json(responseSuccess());
        } else {
            res.json(responseWithError(ErrorCodes.ERROR_CODE_API_BAD_REQUEST, 'error'));
        }
    }).catch(err => {
        res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    })
}
// //Quên mật khẩu
exports.forgotpassword = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.send({
                code: 403,
                error: {
                    status: 403,
                    message: "Insufficient authorization token"
                }
            });
        } else {
            reset_token = req.headers['authorization'].split(' ')[1];
            await userService.getByResetToken(reset_token).then(async (user) => {
                if (user.expires_reset_token < new Date()) {
                    return res.send({
                        code: 403,
                        error: {
                            status: 403,
                            message: "Invalid token"
                        }
                    });
                };

                if (!req.body['new_password']) {
                    return res.send({
                        code: 400,
                        error: {
                            status: 400,
                            message: "Must contain new password"
                        }
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashpassword = await bcrypt.hash(req.body['new_password'], salt);
                    user.dataValues.password = hashpassword;
                    user.dataValues.reset_token = null;

                    userService.update(user.id, user.dataValues).then((result) => {
                        if (result.message && result == false) {
                            res.status(404).json({ success: false, code: 1, message: result.message });
                        } else {
                            console.log(user);
                            res.status(200).json({ success: true, code: 0, message: messageConstants.USER_UPDATE_SUSSCESS, data: result });
                        }
                    });
                }
            }).catch((err) => {
                return res.send({
                    code: 1,
                    error: {
                        status: err.status || 500,
                        message: err.message
                    }
                });
            });
        };
    } catch (err) {
        console.log(err);
        res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    }
}
//Cập nhật trạng thái tài khoản
exports.confirm = async (req, res) => {
    try {
        console.log(req.params.token);
        let token = req.params.token;
        userService.getByToken(token).then((result) => {
            let date = new Date();
            if (date < result.expires) {
                userService.update(result.id, {
                    status: 1
                }).then(() => {
                    return res.send("<html> <head>Chuc mung</head><body><h1> Kich hoat tai khoan <p>thanh cong</p></h1></body></html>");
                })
            } else {
                return res.send("<html> <head>Chuc mung</head><body><h1> Kich hoat tai khoan <p>khong thanh cong</p></h1></body></html>");
            }
        })

    } catch (err) {
        throw err;
    }
}

//Lấy thông tin người dùng
exports.getById = (req, res) => {
    const id = req.params.id;
    userService.getById(id).then((result) => {
        res.status(200).json({ success: true, code: 0, message: messageConstants.USER_FOUND, data: result });
    }).catch((err) => {
        res.send({
            error: {
                status: err.status || 500,
                message: err.message
            }
        });
    });
};

//Gửi mã xác minh Token
exports.sendVerify = async (req, res) => {
    const email = req.body.email;
    await userService.getByEmail(email).then(async (user) => {
        const tokenObject = {
            email: user.req.email,
            id: user.id,
        };
        var secret = user.id + "_" + user.email + "_" + new Date();
        var token = jwt.sign(tokenObject, secret);
        var time = new Date();
        var timeExpire = new Date();
        timeExpire.setMinutes(time.getMinutes() + 5);
        const options = {
            token: token,
            expires: timeExpire,
            updated_date: timeExpire,
        };
        userService.update(user.id, options).then(() => {
            res.status(200).json({
                success: true,
                code: 0,
                verify_data: email
            });
        });
        const from_email = "lehonglong307@gmail.com";
        const to_email = `${email}`;
        var url = "http://" + req.body.url + "/confirm/" + token;
        var mailOptions = {
            from: from_email,
            to: to_email,
            subject: "Password help has arrived!",
            text: `Click to verify: ${url}`,
            html: `<div style="text-align: center">
                <h2 style="font-size: 24px; margin-bottom: 16px">Chào: <span style="font-weight: 600; color: #09B1BA">${user.user_name}</span> !</h2>
                <h2 style="font-size: 22px; margin-bottom: 24px">Nhấn vào đường dẫn bên dưới để xác nhận !</h2>
                <button style="padding: 10px 26px; background: #ffffff; border: 1px solid #09B1BA; border-radius:8px"><a style="text-decoration: none; color: #09B1BA; font-size: 22px; font-weight: 600" href="${url}">Xác nhận</a></button>
                </div>`,
        };
        const contentMail = await transporter.sendMail(mailOptions);
        if (contentMail.accepted.length < 1) {
            res.json({
                success: false,
                code: 1,
                error: {
                    status: 404,
                    message: contentMail,
                },
            });
        }
    })
        .catch((err) => {
            res.send({
                code: 1,
                error: {
                    status: err.status || 500,
                    message: err.message,
                },
            });
        });
};

//Gửi email quên mật khẩu
exports.sendMail = async (req, res) => {
    const email = req.body.email;
    await userService.getByEmail(email).then(async (user) => {
        const tokenObject = {
            email: req.body.email
        }
        var secret = user.email + "_" + new Date();
        var reset_token = jwt.sign(tokenObject, secret);
        var time = new Date();
        var timeExpires = new Date();
        timeExpires.setMinutes(time.getMinutes() + 10);
        const options = {
            reset_token: reset_token,
            expires_reset_token: timeExpires,
            updated_date: timeExpires,
        };
        userService.update(user.id, options).then(() => {
            res.status(200).json({
                success: true,
                code: 0,
                verify_data: email
            });
        });
        const from_email = "lehonglong307@gmail.com";
        const to_email = `${email}`;
        var url = "http://" + req.headers.host + "/api/user/html-forgotpassword/" + reset_token;
        var mailOptions = {
            from: from_email,
            to: to_email,
            subject: "Password help has arrived!",
            text: `Click to verify: ${url}`,
            html: `<div style="text-align: center">
            <h2 style="font-size: 24px; margin-bottom: 16px">Chào: <span style="font-weight: 600; color: #09B1BA">${user.user_name}</span> !</h2>
            <h2 style="font-size: 22px; margin-bottom: 24px">Nhấn vào đường dẫn bên dưới để lấy lại mật khẩu !</h2>
            <button style="padding: 10px 26px; background: #ffffff; border: 1px solid #09B1BA; border-radius:8px"><a style="text-decoration: none; color: #09B1BA; font-size: 22px; font-weight: 600" href="${url}">Reset Password</a></button>
            </div>`,
        };
        const contentMail = await transporter.sendMail(mailOptions);
        if (contentMail.accepted.length < 1) {
            res.json({
                success: false,
                code: 1,
                error: {
                    status: 404,
                    message: contentMail,
                },
            });
        }
    })
        .catch((err) => {
            res.send({
                code: 1,
                error: {
                    status: err.status || 500,
                    message: err.message,
                },
            });
        });
};
//Login with google by HongLong
exports.loginWithGoogle = async (req, res) => {
    let data = {
        google_id: req.body.user.id,
        email: req.body.user.email,
        user_name: req.body.user.email,
        full_name: req.body.user.name || req.body.user.familyName + ' ' + req.body.user.givenName,
        avatar: req.body.user.photo,
        status: 1
    };
    var user = null;
    var checkUserExisting = await models.user.findOne({
        where: {
            email: req.body.user.email,
            google_id: null
        }
    });
    console.log(checkUserExisting);
    if (!checkUserExisting) {
        let user = await models.user.findOne({
            where: {
                google_id: req.body.user.id
            }
        });
        if (user == null) {
            console.log('1111');
            user = await models.user.create(data);
            var access_token = await signAccessToken(user);
            console.log(access_token);
            var refresh_token = await signRefreshToken(user);
        }
        access_token = await signAccessToken(user);
        refresh_token = await signRefreshToken(user);
    }
    data = Object.assign(data, { access_token: access_token });
    data = Object.assign(data, { refresh_token: refresh_token });
    res.json(responseSuccess(data));
};
//Login with facbook By HongLong
exports.loginWithfacebook = async (req, res) => {
    const { accessToken, id } = req.body;
    const response = await fetch(`https://graph.facebook.com/v3.1/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
    const json = await response.json()
    if (json.id === id) {
        var checkUserExisting = await models.user.findOne({
            where: {
                facebook_id: id
            }
        });
        if (checkUserExisting) {
            const access_token = await signAccessToken(checkUserExisting);
            const refresh_token = await signRefreshToken(checkUserExisting);
            checkUserExisting = Object.assign({ access_token: access_token });
            checkUserExisting = Object.assign({ refresh_token: refresh_token });
            res.json(responseSuccess(checkUserExisting));
        } else {
            const data = {
                user_name: json.name,
                full_name: json.name,
                facebook_id: id,
                avatar: req.body.picture.data.url,
                email: req.body.email,
                status: 1
            }
            var user = await models.user.create(data);
            const access_token = await signAccessToken(user);
            const refresh_token = await signRefreshToken(user);
            user = Object.assign(user, { access_token: access_token });
            user = Object.assign(user, { refresh_token: refresh_token });
            res.json(responseSuccess(user));
        }
    } else {
        res.json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND));
    }
}