const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        id_product: {
            type: String,
            required: true
        },
        autor: {
            type: String,
            required: true
        }, 
        contenido: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            default: Date.now
        }

    });

module.exports = model('Comment', commentSchema);

