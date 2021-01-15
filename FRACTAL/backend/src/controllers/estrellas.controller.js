const estrellasCtrl = {};
const redis = require("redis")
var client = redis.createClient();

estrellasCtrl.getStar = async (req, res) => {

    const producto = await client.hgetall(req.params.id, function(err, object) {
    
        res.json(object)

    });
    
}

estrellasCtrl.createStar = async (req, res) => {
    const {usuario, estrellas} = req.body
    await client.hset(
        req.params.id,
        usuario,
        estrellas
    );
    res.json({message: "Calificacion creada"});
}


module.exports = estrellasCtrl;