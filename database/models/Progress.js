const mongoose = require('mongoose');

const processCouser = new mongoose.Schema(
    {
        couserId: {
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
    listProcessCourse: [processCouser],
},{timestamps:true}
);

module.exports=mongoose.model("Proccess", proccess);