const mongoose = require('mongoose');

const video = new mongoose.Schema({
    video_url:{
        type:String,
        default:''
    },
    title:{
        type:String,
        default:''
    },
    time:{
        type:String,
        default:''
    },
    kids: [{type:mongoose.Schema.Types.ObjectId}]
},{timestamps:true}
);

module.exports=mongoose.model("Video",video);