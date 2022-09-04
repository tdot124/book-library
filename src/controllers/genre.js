const { Genre } = require('../models');
const { createItem, getAll, getById, updateItemById, deleteItemById } = require('./helpers');

exports.create = async (req, res) => {createItem(req,res,'genre')};
exports.readAll = async (_, res) => {getAll(res,'genre')};

exports.readById = async (req, res) => {
    const { genreId } = req.params;
    getById(genreId, res, 'genre')
};

exports.updateById = async (req, res) => {
    const { genreId } = req.params;
    updateItemById(genreId, req, res, 'genre');
};

exports.deleteById = async (req, res) => {
    const { genreId } = req.params;
    deleteItemById(genreId, res, 'genre');    
};