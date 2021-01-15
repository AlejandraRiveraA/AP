const { Schema, model } = require('mongoose');
const path = require('path');

const imageSchema = new Schema(
    {
        filename: String,
        id_object: String
    }, {
        timestamps: true
    });

    imageSchema.virtual('uniqueId')
        .get(function () {
            return this.filename.replace(path.extname(this.filename), '')
        });

    module.exports = model('Image', imageSchema);