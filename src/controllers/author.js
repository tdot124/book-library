const { Author } = require('../models');
const { createItem, getAll, getById, updateItemById, deleteItemById } = require('./helpers');

exports.create = async (req, res) => {createItem(req,res,'author')};
exports.readAll = async (_, res) => {getAll(res,'author')};

exports.readById = async (req, res) => {
    const { authorId } = req.params;
    getById(authorId, res, 'author')
};

exports.updateById = async (req, res) => {
    const { authorId } = req.params;
    updateItemById(authorId, req, res, 'author');
};

exports.deleteById = async (req, res) => {
    const { authorId } = req.params;
    deleteItemById(authorId, res, 'author');    
};