const sessionsStateCtrl = {};
const SessionState = require('../models/SessionState');

sessionsStateCtrl.getSessionsState = async (req, res) => {

    const sessions = await SessionState.find().sort({createdAt: -1});
    res.json(sessions);

};


sessionsStateCtrl.createSessionState = async (req, res) => {
    console.log(req.body);
    const { id, nombre, admin} = req.body;
    const newSessionState = new SessionState({
            id,
            nombre,
            admin

    });

    await newSessionState.save();
    res.json({message: "Session Creada"});

};

sessionsStateCtrl.getSessionState = async (req, res) => {

    const session = await SessionState.findById(req.params.id);
    res.json(session);

};

sessionsStateCtrl.updateSessionState = async (req, res) => {

    const { id, nombre, admin} = req.body;

    await SessionState.findOneAndUpdate({_id: req.params.id}, {
        
        id,
        nombre, 
        admin
    });

        res.json({message : "Session Actualizada"});
};

module.exports = sessionsStateCtrl;