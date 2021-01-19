const { Schema, model } = require('mongoose');

const postSchema = new Schema(
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

    
    }, {

        timestamps: true
    });

module.exports = model('Post', postSchema);
