const express = require('express');
const authorController = require('../controllers/author');

const router = express.Router();

router.post('/',authorController.create);
router.get('/', authorController.readAll);
router.get('/:authorId', authorController.readById);
router.patch('/:authorId', authorController.updateById);
router.delete('/:authorId', authorController.deleteById);

module.exports = router;