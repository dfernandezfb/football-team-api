const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger= require('morgan');
const connectDB = require('./config/db');
const matches = require('./routes/matches')
const users = require('./routes/users')

const app = express();
dotenv.config();
connectDB()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/matches', matches)
app.use('/users', users)

app.listen(4000,()=>console.log('Listening...'));