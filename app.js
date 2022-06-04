const express = require('express');
const app =  new express();
const router= require("./src/routes/route");

const bodyParser = require('body-parser');
//security middleware middleware
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require('path');
//database 
const mongoose = require("mongoose");

//security middleware implementation
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());

//body bodyParser
app.use(bodyParser.json());
//rate limit
const limiter = ratelimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);

//databse connection settings
// const uri="mongodb+srv://<username>:<password>@cluster0.fmftb.mongodb.net/CRUD?retryWrites=true&w=majority";
// const options = {
//     user:"crudUser",
//     pass:"FJsM!rE.aprsi82",
//     autoIndex:true,
// };
const uri = "mongodb://127.0.0.1:27017/Todo"; 
mongoose.connect(uri, (err)=>{
    if(!err){
        console.log("Database connection successfully")
    }
    else{
        console.log("Database connection fail")
    }
});
//managing backend routing 
app.use("/api/v1", router);



module.exports = app;