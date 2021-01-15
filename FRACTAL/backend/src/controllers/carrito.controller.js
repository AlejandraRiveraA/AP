const carritosCtrl = {};
const redis = require("redis")
var client = redis.createClient();

carritosCtrl.getCarrito = async (req, res) => {

    const carrito = await client.hgetall(req.params.id, function(err, object) {
    
        res.json(object)

    });
    
}

carritosCtrl.addItem = async (req, res) => {
    const { idproducto, cantidad} = req.body
    await client.hset(
        req.params.id,
        idproducto,
        cantidad
    );
    res.json({message: "Item Agregado"});
}

carritosCtrl.addItem = async (req, res) => {
    const { idproducto, cantidad} = req.body
    await client.hset(
        req.params.id,
        idproducto,
        cantidad
    );
    res.json({message: "Item Agregado"});
}

carritosCtrl.deleteItemCarrito = async (req, res) => {
    const { idproducto } = req.body
    await client.hdel(req.params.id, idproducto);
    res.json({data: "Item Eliminado"});
}


module.exports = carritosCtrl;