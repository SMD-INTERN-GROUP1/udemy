const mongoose = require('mongoose');

const course = new mongoose.Schema({
    image:{
        type:String,
        default:''
    },
    title:{
        type:String,
        default:''
    },
    author: {
        type: String,
        default: ''
    },
    description:{
        type:String,
        default:''
    },
    start:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0
    },
    isDiscount:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        default:''
    },
    comments : [{ type : mongoose.Types.ObjectId, ref : "Comments" }]
    // kids: [{type:mongoose.Schema.Types.ObjectId}]
},{timestamps:true}
);

module.exports=mongoose.model("Courses",course);