const { Router } = require('express');
const { addMatch, getAllMatches, getLastMatch, getMatch, getPoints, getWorstRival, getMatches } = require('../controllers/matches');
const { check } = require("express-validator");
const validateFields = require('../middlewares/validateFields');
const { isDateEmpty } = require('../utils/customValidations');
const auth = require('../middlewares/auth');
const router = Router();

router.post('/',[
  check('GF','Los goles a favor no pueden ser negativos').not().isEmpty().isFloat({min:0}),
  check('GA','Los goles a favor no pueden ser negativos').not().isEmpty().isFloat({min:0}),
  check('matchWeek','La fecha no pueden ser negativa').not().isEmpty().isFloat({min:0}),
  check('points','Los puntos no pueden ser negativos').not().isEmpty().isFloat({min:0}),
  check('date').not().isEmpty().custom(isDateEmpty),
  check('rival').not().isEmpty(),
  check('tournament').not().isEmpty(),
  validateFields,
  auth
],addMatch)

router.get('/', auth, getAllMatches)

router.get('/last', auth, getLastMatch)

router.get('/single', auth, getMatch)

router.get('/points', auth, getPoints)

router.get('/father', auth, getWorstRival)

router.get('/date', auth, getMatches)

module.exports = router;
// check('user').not().isEmpty().isLength({min:3}).isLength({max:30}),
// check('password').not().isEmpty().isLength({min:6}).isLength({max:12}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/)*/),