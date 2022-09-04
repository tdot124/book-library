const { Reader } = require('../models');
const { createItem, getAll, getById, updateItemById, deleteItemById } = require('./helpers');

exports.create = async (req, res) => {createItem(req,res,'reader')};
exports.readAll = async (_, res) => {getAll(res,'reader')};

exports.readById = async (req, res) => {
    const { readerId } = req.params;
    getById(readerId, res, 'reader')
};

exports.updateById = async (req, res) => {
    const { readerId } = req.params;
    updateItemById(readerId, req, res, 'reader');
};

exports.deleteById = async (req, res) => {
    const { readerId } = req.params;
    deleteItemById(readerId, res, 'reader');    
};