const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        precio: Number,
        
        cantidad: Number,

        categoria: String,

        envio: String,

        bloqueo: Boolean

    }, {

        timestamps: true
    });

module.exports = model('Product', productSchema);
