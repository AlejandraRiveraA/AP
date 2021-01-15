const PimagesCtrl = {};
const path = require('path');
const fs = require('fs-extra');
const Image = require('../models/ProfileImage');
const { randomNumber } = require('../helpers/libs');

PimagesCtrl.getImage = async (req, res) => {
    const images = await Image.find();
    res.json(images);
};

PimagesCtrl.createImage = (req, res) => {
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({ filename: imgUrl });
        if (images.lenght > 0) {
            saveImage();
        } else {
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`../frontend/src/public/upload/${imgUrl}${ext}`);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                await fs.rename(imageTempPath, targetPath);
                const newImage = new Image({
                    filename: imgUrl + ext,
                    id_object: req.body.id_object
                });
                const imageSaved = await newImage.save();
                //res.send('works');
                //res.redirect('/images/' + imageSaved.uniqueId);
            } else {
                await fs.unlink(imageTempPath);
                //res.status(500).json({ error: 'Solo imagenes' });
            }
            //res.json({ message: "Imagen Guardada" });
        }
    }

    saveImage();

};

module.exports = imagesCtrl;