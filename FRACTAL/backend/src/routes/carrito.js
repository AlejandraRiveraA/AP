//products.js
const {Router} = require('express');
const router = Router();

const { getCarrito, addItem, deleteItemCarrito} = require('../controllers/carrito.controller');

router.route('/:id')
        .post(addItem)
        .get(getCarrito)
        .delete(deleteItemCarrito)


module.exports = router