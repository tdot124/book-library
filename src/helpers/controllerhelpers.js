const createItem = async (req,res,model) => {
    try{
        const newItem = await model.create(req.body);   
    
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

const items = await model.findAll();

if (!items) {
    res.status(404).json({error: `${model}Readers could not be found`})
} else {
    res.status(200).json(items);
    }
};

module.exports = {
    createItem,
    getAll,
}
