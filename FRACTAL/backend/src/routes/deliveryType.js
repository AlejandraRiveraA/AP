
const {Router} = require('express');
const router = Router();

const {getDeliveryTypes, createDeliveryType, deleteDeliveryType} = require('../controllers/deliveryType.controller')

router.route('/')
        .get(getDeliveryTypes)
        .post(createDeliveryType);

router.route('/:iddeliveryType') 
        .delete(deleteDeliveryType)


module.exports = router