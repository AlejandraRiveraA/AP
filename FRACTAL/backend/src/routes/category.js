const {Router} = require('express');
const router = Router();

const { getCategorys, createCategory, deleteCategory } = require('../controllers/category.controller');

router.route('/')
        .get(getCategorys)
        .post(createCategory);

router.route('/:idcategory')
        .delete(deleteCategory)

module.exports = router