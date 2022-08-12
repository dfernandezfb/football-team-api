const jwt = require('jsonwebtoken')

const auth = (req,res,next) =>{
  try {
    const token = req.header('authorization');
    if(!token) throw new Error('Credenciales inválidas');
    const { uid } = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!uid) throw new Error('Credenciales inválidas');
    req.uid;
    next();
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports = auth;