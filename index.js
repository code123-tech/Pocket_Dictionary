require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dictionary = require("./routes/api/dictionary");
const mongoose = require("mongoose");
const app = express();


//Connect Database
mongoose.connect(process.env.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true});
//Using Cors Policy to Make a Cors-Origin Request
app.use(cors({origin:true,credentials:true}));

//Init Middleware
app.use(express.json({ extended: false }));

//Using Routes
app.use("/api/dictionary",dictionary);

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

//Listening to port 
app.listen(process.env.PORT || 8000,()=>{
    console.log("Server started Done");
})