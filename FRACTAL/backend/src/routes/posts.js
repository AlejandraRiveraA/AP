//products.js
const {Router} = require('express');
const router = Router();

const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/post.controller');

router.route('/')
        .get(getPosts)
        .post(createPost);

router.route('/:id')
        .get(getPost)
        .put(updatePost)
        .delete(deletePost)


module.exports = router