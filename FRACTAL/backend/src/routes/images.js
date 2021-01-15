//images.js
const { Router } = require('express');
const router = Router();

const { createImage, getImages } = require('../controllers/image.controller');

router.route('/')
    .get(getImages)
    .post(createImage);

/*router.route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);*/

module.exports = router;