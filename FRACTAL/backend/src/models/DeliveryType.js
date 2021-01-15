const { Schema, model } = require('mongoose');

const deliveryTypeSchema = new Schema(
    {
        nameType: {
            type: String,
            required: true,
            trim: true
        },

    }, {
        timestamps: true
    });

module.exports = model('DeliveryType', deliveryTypeSchema);
