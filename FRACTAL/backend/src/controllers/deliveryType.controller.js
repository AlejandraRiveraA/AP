const deliveryTypesCtrl = {};
const DeliveryType = require('../models/DeliveryType');

const pool = require('../databases/mysql'); 


deliveryTypesCtrl.getDeliveryTypes = async (req, res) => {

    const deliveryTypes = await pool.query('SELECT * FROM deliveryType');
    console.log(deliveryTypes);
    res.json(deliveryTypes);
};

deliveryTypesCtrl.createDeliveryType = async (req, res) => {
    
    console.log(req.body);
    const { deliveryTypeName } = req.body;
    await pool.query('INSERT INTO deliveryType (deliveryTypeName) VALUES (?)', deliveryTypeName);
    res.json({message: "Tipo de envio creado"});
   
};


deliveryTypesCtrl.deleteDeliveryType = async (req, res) => {

    const { iddeliveryType } = req.params;
    await pool.query('DELETE FROM deliveryType WHERE iddeliveryType = ?', [iddeliveryType]);
    res.json({message: "Tipo de envio eliminado"});
   
};

module.exports = deliveryTypesCtrl;
