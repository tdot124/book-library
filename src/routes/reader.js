const express = require('express');
const readerController = require('../controllers/reader');

const router = express.Router();

router.post('/',readerController.create);
router.get('/', readerController.readAll);
router.get('/:readerId', readerController.readById);

module.exports = router;