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

const getAllMatches = async (req,res)=>{
  try {
    const matches = await Match.find();
    if(matches.length===0) return res.status(200).json({message:'No hay partidos cargados'});
    res.status(200).json(matches)
  } catch (error) {
    res.status(/*error.code ||*/ 500).json({message:error.message});
  }
}

const getLastMatch = async (req,res)=>{
  try {
    const orderedMatches = await Match.find().sort({date:1});
    const lastMatch = orderedMatches.pop();
    res.status(200).json(lastMatch)
  } catch (error) {
    res.status(/*error.code ||*/ 500).json({message:error.message});
  }
}

const getMatch = async (req,res)=>{
  try {
    const {date} = req.query;
    const match = await Match.findOne({date});
    if(!match)return res.status(200).json({message:'No existe partido en esa fecha'})
    res.status(200).json(match)
  } catch (error) {
    res.status(/*error.code ||*/ 500).json({message:error.message});
  }
}

const getPoints = async (req,res)=>{
  try {
    let { t } =req.query;
    if(!t) throw new Error ('Faltan campos requeridos')
    if(t.includes('%')) t = t.replace(/%/gi,' ');
    const matches = await Match.find({tournament:t});
    const poinstArray = matches.map((match=>match.points))
    const points = poinstArray.reduce((a,b)=>a+b);
    res.status(200).json({message:`Los puntos conseguidos en el torneo ${t} son ${points}`})
  } catch (error) {
    res.status(/*error.code ||*/ 500).json({message:error.message});
  }
}
// Promise.all([
//   ga de equipo1,
//   ga de equipo 2
// ])
const getWorstRival = async(req,res) =>{
  try {
    const matches = await Match.find().sort({GA:1});
    const father = matches.pop().rival
    res.status(200).json({message:'Nuestro papá es ' + father});
  } catch (error) {
    res.status(/*error.code ||*/ 500).json({message:error.message});
  }
}

const getMatches = async(req,res)=>{
  try {
    let {start, end} = req.query;
    if(!end) end= new Date();
    const matches = await Match.find({$and:[{date:{$gte:start}},{date:{$lte:end}}]});
    res.status(200).json(matches)
  } catch (error) {
    res.status(/*error.code ||*/ 500).json({message:error.message});
  }
}

module.exports = {
  addMatch,
  getAllMatches,
  getLastMatch,
  getMatch,
  getPoints,
  getWorstRival,
  getMatches
}