const productsCtrl = {};
const Product = require('../models/Product');

productsCtrl.getProducts = async (req, res) => {

    const products = await Product.find().sort({createdAt: -1});
    res.json(products);

};


productsCtrl.createProduct = async (req, res) => {
    console.log(req.body);
    const { title, description, precio, cantidad, categoria, envio, bloqueo } = req.body;
    const newProduct = new Product({

            title,
            description,
            precio,
            cantidad,
            categoria,
            envio,
            bloqueo

    });

    await newProduct.save();
    res.json({message: "Producto Creado"});

};

productsCtrl.getProduct = async (req, res) => {

    const product = await Product.findById(req.params.id);
    res.json(product);

};

productsCtrl.updateProduct = async (req, res) => {

    const { title, description, precio, cantidad, categoria, envio, bloqueo } = req.body;

    await Product.findOneAndUpdate({_id: req.params.id}, {
        
        title, 
        description, 
        precio, 
        cantidad,
        categoria,
        envio,
        bloqueo
    });

        res.json({message : "Producto Actualizado"});
};

productsCtrl.deleteProduct = async (req, res) => {

        await Product.findByIdAndDelete(req.params.id);
        res.json({message : "Producto Eliminado"});

};

module.exports = productsCtrl;