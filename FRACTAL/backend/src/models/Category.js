const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        nameCategory: { 
            
            type: String,
            required: true,
            unique: true,
            trim: true

        }
    });

    module.exports = model('Category', categorySchema);
