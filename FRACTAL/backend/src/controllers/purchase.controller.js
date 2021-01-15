const purchaseCtrl = {};
const Purchase = require('../models/Purchase');

purchaseCtrl.getPurchases = async (req, res) => {

    const purchases = await Purchase.find().sort({createdAt: -1});
    res.json(purchases);

};


purchaseCtrl.createPurchase = async (req, res) => {
    
    const { user, privacity, products, total } = req.body;
    const newPurchase = new Purchase({

            user,
            privacity,
            products,
            total

    });

    await newPurchase.save();
    res.json({message: "Compra Creada"});

};

purchaseCtrl.getPurchase = async (req, res) => {

    const purchase = await Purchase.findById(req.params.id);
    res.json(purchase);

};


purchaseCtrl.deletePurchase = async (req, res) => {

        await Purchase.findByIdAndDelete(req.params.id);
        res.json({message : "Compra Eliminada"});

};

module.exports = purchaseCtrl;