const { Book } = require('../models');
const { createItem, getAll, getById, updateItemById, deleteItemById } = require('../helpers/controllerhelpers');

exports.create = async (req, res) => {createItem(req,res,'book')};
exports.readAll = async (_, res) => {getAll(res,'book')};

exports.readById = async (req, res) => {
    const { bookId } = req.params;
    getById(bookId, res, 'book')
};

exports.updateById = async (req, res) => {
    const { bookId } = req.params;
    updateItemById(bookId, req, res, 'book');
};

exports.deleteById = async (req, res) => {
    const { bookId } = req.params;
    deleteItemById(bookId, res, 'book');    
};