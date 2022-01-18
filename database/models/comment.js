const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    user : {  type : mongoose.Types.ObjectId, ref : "Users" },
    content : String,
    rate : Number
},{timestamps:true}
);

module.exports=mongoose.model("Comments",Comment);