const express = require('express');
const router = express.Router();
const examination_roomController = require('../controller/examination_roomController');
const { checkAccessToken } = require('../middlewares/jwt_token');

router.post('/', checkAccessToken, examination_roomController.create);
router.put('/:id', checkAccessToken, examination_roomController.update);
router.delete('/:id', checkAccessToken, examination_roomController.delete);
router.get('/', checkAccessToken, examination_roomController.getAll);

router.get('/all-paging', checkAccessToken, examination_roomController.getAllPaging);
router.get('/info-collect/:id', examination_roomController.getInfoCollect);
router.get('/:id', checkAccessToken, examination_roomController.getById);

module.exports = router;