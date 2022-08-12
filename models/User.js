const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  user:{
    type:String,
    required:[true, 'El usuario es obligatorio'],
    unique:[true, 'El usuario debe ser único, ya existe uno usuario creado con ese nombre'],
    minLength:[3,'La cantidad mínima de caracteres es 3'],
    maxLength:[30,'La cantidad máxima de caracteres es 30'],
    trim:true,
  },
  password:{
    type: String,
    required:[true, 'La contraseña es obligatoria'],
    trim:true
  }
},{
  versionKey:false
})

UserSchema.methods.toJSON = function (){
  const {_id, password, ...user } = this.toObject();
  user.uid=_id;
  return user
}

module.exports = model('User',UserSchema);