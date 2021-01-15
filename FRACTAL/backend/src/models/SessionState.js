const { Schema, model } = require('mongoose');

const sessionStateSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            trim: true
        },
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        admin: {
            type: String,
            required: true,
            trim: true
        }
    }, {

        timestamps: true
    });

module.exports = model('SessionState', sessionStateSchema);
