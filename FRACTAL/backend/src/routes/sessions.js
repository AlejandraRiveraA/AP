//products.js
const {Router} = require('express');
const router = Router();

const { getSessionState, getSessionsState, createSessionState, updateSessionState } = require('../controllers/sessions.controller');

router.route('/')
        .get(getSessionsState)
        .post(createSessionState);

router.route('/:id')
        .get(getSessionState)
        .put(updateSessionState)
    


module.exports = router