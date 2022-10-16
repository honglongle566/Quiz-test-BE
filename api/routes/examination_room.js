const express = require('express');
const router = express.Router();
const examination_roomController = require('../controller/examination_roomController');
const {checkAccessToken} = require('../middlewares/jwt_token');

router.post('/',checkAccessToken, examination_roomController.create);
router.put('/:id', checkAccessToken, examination_roomController.update);
router.delete('/:id', checkAccessToken, examination_roomController.delete);
router.get('/', examination_roomController.getAll);
router.get('/:id', examination_roomController.getById);
router.get('/all-paging', examination_roomController.getAllPaging);

module.exports = router;