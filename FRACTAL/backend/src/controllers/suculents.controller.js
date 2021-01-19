const suculentsCtrl = {};
const Suculent = require('../models/Suculent');

suculentsCtrl.getSuculents = async (req, res) => {

    const suculents = await Suculent.find().sort({createdAt: -1});
    res.json(suculents);

};


suculentsCtrl.createSuculent = async (req, res) => {
    console.log(req.body);
    const { title,
        description,
        enfermedad,
        reproduction,
        cuidado } = req.body;
    const newSuculent = new Suculent({

            title,
            description,
            enfermedad,
            reproduction,
            cuidado


    });

    await newSuculent.save();
    res.json({message: "Suculenta Creado"});

};

suculentsCtrl.getSuculent = async (req, res) => {

    const suculent = await Suculent.findById(req.params.id);
    res.json(suculent);

};

suculentsCtrl.updateSuculent = async (req, res) => {

    const { title,
        description,
        enfermedad,
        reproduction,
        cuidado } = req.body;

    await Suculent.findOneAndUpdate({_id: req.params.id}, {
        
        title,
        description,
        enfermedad,
        reproduction,
        cuidado
    });

        res.json({message : "Suculenta Actualizada"});
};

suculentsCtrl.deleteSuculent = async (req, res) => {

        await Suculent.findByIdAndDelete(req.params.id);
        res.json({message : "Suculenta Eliminada"});

};

module.exports = suculentsCtrl;