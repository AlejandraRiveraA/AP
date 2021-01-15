//purchase.js
const {Router} = require('express');
const router = Router();

const { getPurchase, getPurchases, createPurchase,  deletePurchase } = require('../controllers/purchase.controller');

router.route('/')
        .get(getPurchases)
        .post(createPurchase)

router.route('/:id')
        .get(getPurchase)  
        .delete(deletePurchase)


module.exports = router