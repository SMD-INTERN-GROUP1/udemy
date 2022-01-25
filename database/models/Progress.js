const mongoose = require('mongoose');

const progress = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
    },
    course_id: {
        type: mongoose.Types.ObjectId,
    },
    videoFinish: {
        type: Number,
    },
    totalVideo: {
        type: Number,
    }
},{timestamps:true}
);

module.exports=mongoose.model("Progress", progress);