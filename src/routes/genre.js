const express = require('express');
const genreController = require('../controllers/genre');

const router = express.Router();

router.post('/',genreController.create);
router.get('/', genreController.readAll);
router.get('/:genreId', genreController.readById);
router.patch('/:genreId', genreController.updateById);
router.delete('/:genreId', genreController.deleteById);

module.exports = router;