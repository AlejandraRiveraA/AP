
//aquí va el codigo del server
const express = require('express');
const  cors = require('cors');
const app = express(); //devuelve el servidor
const multer = require('multer');
const path = require('path');

const bodyParser = require('body-parser')



//---
const passportConf = require('./config/passport');
const session = require ('express-session');
const passport = require('passport');   
const ctrUser = require('./controllers/users.controller');
const MongoStore = require('connect-mongo')(session);
const MONGO_URL = 'mongodb://localhost/mongoelmercadito';



//settings
app.set('port', process.env.PORT || 5000); //busca si hay un puerto asignado en el ambiente o agarra el 5000



//middlewares
app.use(cors());
app.use(express.json());
app.use(multer({dest: path.join(__dirname, '../../frontend/src/public/upload/temp')}).single('Image'));
app.use(express.urlencoded({extend: false}));


//sesion
app.use(session({
    secret: 'SECRETO',
    resave: true,
    saveUnintialized: true,
    store: new MongoStore({
        url: MONGO_URL,
        autoReconnect: true
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




// routes
app.use('/api/users', require ('./routes/users') )
app.use('/api/suculents', require ('./routes/suculents') )
app.use('/api/posts', require ('./routes/posts') )


app.use('/api/comment', require ('./routes/comments'))
app.use('/api/images', require ('./routes/images') )
app.use('/api/sessionState', require ('./routes/sessions'))



app.post('/api/singup', ctrUser.postSignUp);
app.post('/api/login', ctrUser.postLogIn);
app.get('/api/logout', passportConf.estaAutenticado, ctrUser.logout);
app.get('/api/userinfo', passportConf.estaAutenticado, (req, res) => {
    res.json(req.user);
})



module.exports = app; 