const Match = require("../models/Match")

const isDateEmpty = async (date)=>{
  const match = await Match.findOne({date});
  console.log(match);
  if(match) throw new Error('Ya existe un partido esa fecha');
}

const isMatchWeekEmpty = (matchweek)=>{
  const match = Match.find({$and:[{tournament},{matchweek}]});
  if(match) throw new Error('Ya existe un partido en esa fecha de ese torneo');
}


module.exports = {
  isDateEmpty
}