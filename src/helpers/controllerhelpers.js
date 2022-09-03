const { Reader, Book } = require('../models/index')

const getModel = (model) => {
    if (model === 'reader') {
        return Reader;
      }
      if (model === 'book') {
        return Book;
      }
      if (model === 'author') {
        return Author;
      }
      if (model === 'genre') {
        return Genre;
      }
    };

const createItem = async (req,res,model) => {
    const Model = getModel(model);
    try{
        const newItem = await Model.create(req.body);   
    
        if (!newItem) {
            res.status(404).json({error: `${model} not created`})
        } else {
            res.status(201).json(newItem);
        }    
        } catch (err) {
            return res.status(400).json({err})
        }
};

const getAll = async (res,model) => {
    const Model = getModel(model);

const items = await Model.findAll();

if (!items) {
    res.status(404).json({error: `${model} could not be found`})
} else {
    res.status(200).json(items);
    }
};

const getById = async (id,res,model) => {
    const Model = getModel(model);
    const item = await Model.findByPk(id);
    
    if (!item) {
        res.status(404).json({error: `The ${model} could not be found.`});
    } else {
        res.status(200).json(item);
    }
}

const updateItemById = async (itemId, req, res, model) => {
    const Model = getModel(model);
    const updateData = req.body;

    const [updatedRows] = await Model.update(updateData, {where: {id: itemId}});

    if (!updatedRows) {
        res.status(404).json({error: `The ${model} could not be found.`});
    } else {
        res.status(200).json(updatedRows);
    }
};

const deleteItemById = async (itemId, res, model) => {
    const Model = getModel(model);

    const deletedRows = await Model.destroy({where: {id: itemId} });

    if (!deletedRows) {
        res.status(404).json({error: `The ${model} could not be found.`});
    } else {
        res.status(204).json(deletedRows);
    }
}


module.exports = {
    createItem,
    getAll,
    getById,
    updateItemById,
    deleteItemById,
}
