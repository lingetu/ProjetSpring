import dotenv from 'dotenv';

dotenv.config();


import cors from "cors";
import express from "express";

import guestRouter from './routers/guest.router';

import studentRouter from './routers/student.router';

import { dbConnect } from './configs/database.config';

dbConnect();




// const filenameUser = "./data/users.json";

const app = express();  // an express application where we will define all ours api

app.use(express.json()); // allow us to send a json request 


app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
    
    });


app.use(cors({
    credentials:true,
    origin:[ "http://localhost:4200"]    // to connect to the client serve 
}));





app.use("/api/students",studentRouter);

app.use("/api/guests",guestRouter);

const port = 5000;

app.listen(port ,()=>{
    console.log("Website serve on htpp://localhost:" + port)
})








