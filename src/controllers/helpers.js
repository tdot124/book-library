const { Reader, Book, Author, Genre } = require('../models/index')

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

const includeOptions = (model) => {
    if (model === 'book') return { include: [Genre, Author] };
    if (model === 'genre') return { include: Book };
    return {};
}

const removePassword = (obj) => {
    if (obj.hasOwnProperty('password')) {
        delete obj.password;
    }
    return obj;
};

const createItem = async (req,res,model) => {
    const Model = getModel(model);
    try{
        const newItem = await Model.create(req.body);   
    
        if (!newItem) {
            res.status(404).json({error: `${model} not created`})
        } else {
            const newItemWithoutPassword = removePassword(newItem.dataValues);
            res.status(201).json(newItemWithoutPassword);
        }    
        } catch (err) {
            return res.status(400).json({err})
        }
};

const getAll = async (res,model) => {
    const Model = getModel(model);
    const include = includeOptions(model);
    const items = await Model.findAll({ ...include });    
    const itemsWithoutPassword = items.map((item) => removePassword(item.dataValues))
    res.status(200).json(removePassword(itemsWithoutPassword));        
};

const getById = async (id,res,model) => {
    const Model = getModel(model);
    const include = includeOptions(model);
    const item = await Model.findByPk(id, { ...include });
    
    if (!item) {
        res.status(404).json({error: `The ${model} could not be found.`});
    } else {
        const itemWithoutPassword = removePassword(item.dataValues)
        res.status(200).json(itemWithoutPassword);
    }
}

const updateItemById = async (itemId, req, res, model) => {
    const Model = getModel(model);
    const updateData = req.body;

    const findItem = await Model.findByPk(itemId);

    if (!findItem) {
        res.status(404).json({error: `The ${model} could not be found.`});
    } else {
        await Model.update(updateData, {where: {id: itemId}});    
        res.status(200).json({result: `${model} updated`});
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
