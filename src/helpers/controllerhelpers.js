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

module.exports = {
    createItem,
}
