const { Reader } = require('../models');

exports.create = async (req, res) => {
    const newReader = await Reader.create(req.body);

    if (!newReader) {
        res.status(404).json({error: 'reader not created'})
    } else {
        res.status(201).json(newReader);
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
    console.log(reader);

    if (!reader) {
        res.status(404).json({error: 'The reader could not be found.'});
    } else {
        res.status(200).json(reader);
    }
}