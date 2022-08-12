const {Router} = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/users');
const validateFields = require('../middlewares/validateFields');
const { isUserExist } = require('../utils/customValidations');
const router = Router();


router.post('/',[
  check('user').not().isEmpty().isLength({min:3}).isLength({max:30}),
  check('password').not().isEmpty().isLength({min:6}).isLength({max:12}),
  validateFields
], login)

router.post('/register',[
  check('user','usuario no esta en formato correcto').not().isEmpty().isLength({min:3}).isLength({max:30}).custom(isUserExist),
  check('password','contraseña en formato no válido').not().isEmpty().isLength({min:6}).isLength({max:12}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/),
  validateFields
],register)

module.exports=router