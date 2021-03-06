const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:6,
        unique:true
    },
    email:{
        type:String,
        required:true,
        minlength:10,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    isTeacher:{
        type:Boolean,
        default:false
    },
    isShowProfile:{
        type:Boolean,
        default:false
    },
    fullName:{
        type:String,
        default:''
    },
    headLine:{
        type:String,
        default:''
    },
    biography:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:''
    }
},{timestamps:true}
);

module.exports=mongoose.model("Users",user);