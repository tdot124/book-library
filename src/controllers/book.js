const { Book } = require('../models');

exports.create = async (req, res) => {
    const newBook = await Book.create(req.body);

    if (!newBook) {
        res.status(404).json({error: 'Book not created'})
    } else {
        res.status(201).json(newBook);
    }    
};

exports.readAll = async (req, res) => {
    const books = await Book.findAll();

    if (!books) {
        res.status(404).json({error: 'Books could not be found'})
    } else {
    res.status(200).json(books);
    }
}

exports.readById = async (req, res) => {
    const { bookId } = req.params;
    const book = await Book.findByPk(bookId);
    
    if (!book) {
        res.status(404).json({error: 'The book could not be found.'});
    } else {
        res.status(200).json(book);
    }
}

exports.updateById = async (req, res) => {
    const { bookId } = req.params;
    const updateData = req.body;

    const [updatedRows] = await Book.update(updateData, {where: {id: bookId}});

    if (!updatedRows) {
        res.status(404).json({error: 'The book could not be found.'});
    } else {
        res.status(200).json(updatedRows);
    }
}

exports.deleteById = async (req, res) => {
    const { bookId } = req.params;

    const deletedRows = await Book.destroy({where: {id: bookId} });

    if (!deletedRows) {
        res.status(404).json({error: 'The book could not be found.'});
    } else {
        res.status(204).json(deletedRows);
    }
    
}