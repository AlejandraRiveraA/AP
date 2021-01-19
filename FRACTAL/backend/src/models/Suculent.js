const { Schema, model } = require('mongoose');

const suculentSchema = new Schema(
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

        enfermedad: String,
        
        reproduction: String,

        cuidado: String,

        idUS: String

    }, {

        timestamps: true
    });

module.exports = model('Suculent', suculentSchema);
