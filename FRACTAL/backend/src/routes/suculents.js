//products.js
const {Router} = require('express');
const router = Router();

const { getSuculent, getSuculents, createSuculent, updateSuculent, deleteSuculent, suculentasUsuarios } = require('../controllers/suculents.controller');

router.route('/')
        .get(getSuculents)
        .post(createSuculent);

router.route('/:id')
        .get(suculentasUsuarios)
        .put(updateSuculent)
        .delete(deleteSuculent)


module.exports = router