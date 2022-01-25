const mongoose = require('mongoose');

const processCourse = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Types.ObjectId,
            default: ""
        },
        totalVideo: {
            type: Number
        },
        totalVideoFinish: {
            type: Number,
            default: 1
        },
        processOfVideo: {
            type: Number, 
            default: 0
        }
    }
);

const proccess = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
    },
    listProcessCourse: [processCourse],
},{timestamps:true}
);

module.exports=mongoose.model("Proccess", proccess);