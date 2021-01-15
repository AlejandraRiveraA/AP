const { Schema, model } = require('mongoose');

const purchasechema = new Schema(
    {
        user: {
            type: String,
            required: true,
            trim: true
        },

        privacity: {
            type: String,
            enum: ['private', 'public'],
            required: true
        },

        products: [{}],
        
        total:{
            type: Number,
            require: true
        }
    }, {

        timestamps: true
    });

module.exports = model('Purchase', purchasechema);
