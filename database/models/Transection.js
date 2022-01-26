const mongoose = require("mongoose");

const transection = new mongoose.Schema({
    user_id:{
      type:String,
      default:'',
    },
    payment_id:{
      type:String,
      default:'',
    },
    payee:{
      type:Object,
      default:'',
    },
    status:{
      type:String,
      default:'',
    },
    amount:{
      type:Object,
      default:'',
    }

},{timestamps:true}
);

module.exports = mongoose.model("Transection", transection);
