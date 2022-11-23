const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { checkAccessToken, checkAdmin } = require('../middlewares/jwt_token');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgotpassword',userController.forgotpassword);
router.post('/send-verification-email', userController.sendVerify);
router.post('/send-email',userController.sendMail);
router.get("/get-by-id/:id",userController.getById);
router.put('/:id', userController.update);
router.get('/confirm/:token', userController.confirm);
router.post('/login-with-google',userController.loginWithGoogle);
router.post('/login-with-facebook',userController.loginWithfacebook);
router.delete('/delete/:id', checkAccessToken, checkAdmin, userController.delete);   
module.exports = router;