const categoryCtrl = {};
const Category = require('../models/Category');

const pool = require('../databases/mysql'); 


categoryCtrl.getCategorys = async (req, res) => {

    const categorys = await pool.query('SELECT * FROM Category');
    console.log(categorys);
    res.json(categorys);

};


categoryCtrl.createCategory = async (req, res) => {

    console.log(req.body);
    const { nameCategory } = req.body;
    await pool.query('INSERT INTO category (nameCategory) VALUES (?);', [nameCategory]);
    res.json({message: "Categoria Creado"}); 

};



categoryCtrl.deleteCategory = async (req, res) => {
        const { idcategory } = req.params;
        await pool.query('DELETE FROM Category WHERE idcategory = ?', [idcategory]);
        res.json({message : "Categoria Eliminada"});

};

module.exports = categoryCtrl;