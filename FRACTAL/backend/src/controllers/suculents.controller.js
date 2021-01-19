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
        cuidado,
        id } = req.body;
    const newSuculent = new Suculent({

            title,
            description,
            enfermedad,
            reproduction,
            cuidado,
            id


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
        cuidado, id } = req.body;

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

suculentsCtrl.suculentasUsuarios = async (req, res) => {
    
    const suculents = await Suculent.find({id: { $regex : req.params.id }});
    
    console.log({message :'GET Suculentas por cliente: ' + req.params.id});
    res.json(suculents);

};


module.exports = suculentsCtrl;