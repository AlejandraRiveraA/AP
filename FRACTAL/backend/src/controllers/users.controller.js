
const passport = require('passport');
const userCtrl = {};

const User = require('../models/User');



userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
}

userCtrl.createUser = async (req, res) => {
    const { username, password, nombre, apellido1, apellido2, permisos, nacimiento } = req.body;
    const newUser = new User({ 
        username, 
        password, 
        nombre, 
        apellido1, 
        apellido2, 
        permisos, 
        nacimiento 
    });
    await newUser.save();
    res.json('User Created')
}

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user)
}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json('User Deleted')
}

userCtrl.updateUser = async (req, res) => {
    const { username, password, nombre, apellido1, apellido2, permisos, nacimiento } = req.body;
    await User.findOneAndUpdate({_id: req.params.id}, {
        username, 
        password, 
        nombre, 
        apellido1,
        apellido2,
        permisos,
        nacimiento
    });
        res.json("Usuario Actualizado");
}

//----------------metodos para login, registro y logout
userCtrl.postSignUp = (req, res, next) =>{
    const { username, password, nombre, apellido1, apellido2, permisos, nacimiento } = req.body;
    const newUser = new User({ 
        username, 
        password, 
        nombre, 
        apellido1, 
        apellido2, 
        permisos, 
        nacimiento 
    });
    User.findOne({username: req.body.username}, (err, usuarioExiste) => {
        if(usuarioExiste){
            return res.status(400).send('Ese username está en uso');
        }
        newUser.save((err) => {
            if(err){
                next(err);
            }
            req.logIn(newUser, (err) => {
                if(err){
                    next(err);
                }
            })
            res.send('Usuario creado.')
            
        })
    })
}

userCtrl.postLogIn = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info)=>{
        if(err){
            next(err);
        }
        if (!usuario){
            return res.status(400).send('username o pass incorrecto');

        }
        req.logIn(usuario, (err)=>{
            if(err){
                next(err);
            }
            res.send('Login exitoso');
        } )
    })(req, res, next);
}

userCtrl.logout = (req, res ) =>{
    req.logout();
    res.send('Logout exitoso');
}


module.exports = userCtrl;