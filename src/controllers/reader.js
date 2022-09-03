const { Reader } = require('../models');

exports.create = async (req, res) => {

    try{
    const newReader = await Reader.create(req.body);   

    if (!newReader) {
        res.status(404).json({error: 'reader not created'})
    } else {
        res.status(201).json(newReader);
    }    
    } catch (err) {
        return res.status(400).json({err})
    }
};

exports.readAll = async (req, res) => {
    const readers = await Reader.findAll();

    if (!readers) {
        res.status(404).json({error: 'Readers could not be found'})
    } else {
    res.status(200).json(readers);
    }
}

exports.readById = async (req, res) => {
    const { readerId } = req.params;
    const reader = await Reader.findByPk(readerId);
    
    if (!reader) {
        res.status(404).json({error: 'The reader could not be found.'});
    } else {
        res.status(200).json(reader);
    }
}

exports.updateById = async (req, res) => {
    const { readerId } = req.params;
    const updateData = req.body;

    const [updatedRows] = await Reader.update(updateData, {where: {id: readerId}});

    if (!updatedRows) {
        res.status(404).json({error: 'The reader could not be found.'});
    } else {
        res.status(200).json(updatedRows);
    }
}

exports.deleteById = async (req, res) => {
    const { readerId } = req.params;

    const deletedRows = await Reader.destroy({where: {id: readerId} });

    if (!deletedRows) {
        res.status(404).json({error: 'The reader could not be found.'});
    } else {
        res.status(204).json(deletedRows);
    }
    
}