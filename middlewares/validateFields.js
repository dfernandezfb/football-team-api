const { validationResult } = require('express-validator')

const validateFields = (req,res,next)=>{
  const errors = validationResult(req);
  if(errors.errors.length !=0){
    return res.status(400).json(errors);
  }
  console.log('hi');
  next();
}

module.exports = validateFields;