const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true,
        },
        apellido1: {
            type: String,
            required: true
        },
        apellido2: {
            type: String,
            required: true
        },
        permisos: {
            type: String,
            enum: ['user', 'admin'],
            required: true

        },

        nacimiento: {
            type: Date,
            default: Date.now
        }/*,

        foto: String*/
    }, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }
            usuario.password = hash;
            next();
        })

    })
})

userSchema.methods.compararPassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, sonIguales)=>{
        if(err){
            return cb(err);
        }
        cb(null, sonIguales);
    })
}
module.exports = model('User', userSchema);

//prueba de commit

