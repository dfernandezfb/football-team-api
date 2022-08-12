const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const login = async (req,res)=>{
  try {
    const {user, password} = req.body;
    const userFound = await User.findOne({user});
    if(!userFound) return res.status(404).json({message:'No existe tal usuario'});
    const isOk = await bcrypt.compare(password,userFound.password);
    if(!isOk) return res.status(401).json({message:'Credenciales inválidas'});
    const token = jwt.sign({uid:userFound._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}
const register = async (req,res)=>{
  try {
    let {user, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt);
    const newUser = new User({
      user,
      password
    });
    await newUser.save();
    res.status(201).json({message:'Usuario registrado'})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}


module.exports = {
  login,
  register
}