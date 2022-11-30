const express = require('express');
const router = express.Router();
const examController = require('../controller/examController');
const {checkAccessToken} = require('../middlewares/jwt_token');

router.post('/',checkAccessToken,examController.create);
router.put('/:id',checkAccessToken,examController.update);
router.delete('/:id',checkAccessToken,examController.delete)
router.get('/',examController.getAll);
router.get('/all-paging',examController.getAllPaging);
router.get('/:id',examController.getById);


module.exports = router;