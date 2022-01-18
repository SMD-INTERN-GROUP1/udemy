const mongoose = require('mongoose');

const cart = new mongoose.Schema({
    user_id:{
        type:String,
    },
    listCarts: [{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
},{timestamps:true}
);

module.exports=mongoose.model("Cart",cart);