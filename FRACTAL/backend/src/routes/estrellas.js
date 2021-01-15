//products.js
const {Router} = require('express');
const router = Router();

const { createStar, getStar} = require('../controllers/estrellas.controller');

router.route('/:id')
        .put(createStar)
        .get(getStar)



module.exports = router