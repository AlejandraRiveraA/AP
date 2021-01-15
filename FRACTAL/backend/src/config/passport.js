const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');


passport.serializeUser((usuario, done)=>{
    done(null, usuario._id); //passport usa el id para el match entre la sesion y la base

})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, usuario) => {
         done(err, usuario)
    })
})

 passport.use(new LocalStrategy(
     {usernameField: 'username'},
    (username, password, done)=>{
        User.findOne({username}, (err, usuario)=>{
            if(!usuario){
                return done(null, false, {message: 'este username no está registrado'})//usuario no existe
            }else{
                usuario.compararPassword(password, (err, sonIguales) => {
                    if(sonIguales){
                        return done(null, usuario)
                    } else {
                        return done(null, false, {message: 'Contraseña incorrecta'});//contraseña incorrecta 
                    }
                }
                )
            }

        })

    }
 ))

 exports.estaAutenticado = (req, res, next)=>{ //verifica si está logueado
     if(req.isAuthenticated()){
         return next();
     }
     res.status(401).send('No tienes permisos')
 }