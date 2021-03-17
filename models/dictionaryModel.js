//Model of Dictionary Words
const mongoose = require("mongoose");

const dictSchema = new mongoose.Schema({
    word:{
        type:String,
        required:true
    },
    results:{
        type:Array,
        required:true
    }  
});
module.exports = dict = mongoose.model("dict",dictSchema);

