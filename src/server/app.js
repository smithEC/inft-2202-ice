import path from 'node:path';

import express from 'express';
import defaultRouter from './routes/router.js';
import animalRouter from './routes/animals.js';
import mongoose from 'mongoose';
import {logger} from './utils/logger.js'
import { LoggingMiddleware } from './middleware/logging.js';
import { ErrorHandlingMiddleware } from './middleware/errorHandling.js';
import createHttpErrors from "http-errors";
const {notFound}= createHttpErrors


console.log("this is newer http server!!");

//create server
const PORT = 3000; //we normaly dont set this here
const app = express();

app.use(express.json());
app.use(LoggingMiddleware);
//app.use(express.static(`${import.meta.dirname}/../client`));//finds absolute path 
app.use(express.static('dist'));

app.use('/node_modules', express.static(`${import.meta.dirname}/../../node_modules`));
//app.use('/api',defaultRouter);
app.use('/api', animalRouter);
//404 handler
app.use('*',(err,req,res,next)=>{
    // res.status(404);
    // res.json({error: 'page not found'});
    //next(new notFound('page not found'))
    res.sendFile(path.resolve(import.meta.dirname + '/../..dist/index.html'));
});
//global error handeler
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500);
    res.json({error: err.message});
});

app.use(ErrorHandlingMiddleware)

await mongoose.connect('mongodb://127.0.0.1:27017/inft2202');
console.log('connected to database')
//start the server
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});

