const express = require('express');
const bookController = require('../controllers/book');

const router = express.Router();

router.post('/',bookController.create);
router.get('/', bookController.readAll);
router.get('/:bookId', bookController.readById);
router.patch('/:bookId', bookController.updateById);
router.delete('/:bookId', bookController.deleteById);

module.exports = router;