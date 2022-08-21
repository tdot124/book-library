const express = require('express');
const readerController = require('../controllers/reader');

const router = express.Router();

router.post('/',readerController.create);
router.get('/', readerController.readAll);
router.get('/:readerId', readerController.readById);
router.patch('/:readerId', readerController.updateById);
router.delete('/:readerId', readerController.deleteById);

module.exports = router;