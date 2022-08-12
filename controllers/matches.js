const Match = require("../models/Match");
const { CustomError } = require("../utils/customError");

const addMatch = async (req,res) =>{
  try {
    const {points, ...matchInfo} = req.body;
    const wrongMatch = await Match.findOne({$and:[{tournament:matchInfo.tournament},{matchWeek:matchInfo.matchWeek}]});
    if(wrongMatch) throw new Error('Ya existe un partido en esa fecha de ese torneo',400);
    matchInfo.points = matchInfo.GF>matchInfo.GA? 3 : matchInfo.GA===matchInfo.GF? 1 : 0 
    const match = new Match(matchInfo);
    await match.save();
    res.status(200).json({message:'Match saved'})
  } catch (error) {
    res.status(/*error.code ||*/ 500).json({message:error.message});
  }
}

module.exports = {
  addMatch
}