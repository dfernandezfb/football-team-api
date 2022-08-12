const { model, Schema } = require('mongoose');

const MatchSchema = new Schema({
  GF:{
    type: Number,
    required:[true, 'Los goles son obligatorios'],
    min:[0,'No puede ser un numero negativo']
  },
  GA:{
    type: Number,
    required:[true, 'Los goles son obligatorios'],
    min:[0,'No puede ser un numero negativo']
  },
  date: Date,
  matchWeek:Number,
  points:Number,
  rival:String,
  tournament:String
})

MatchSchema.methods.toJSON = function(){
  const {_id, ...match} = this.toObject();
  match.uid = _id;
  return match;
}

module.exports = model ('Match', MatchSchema);
