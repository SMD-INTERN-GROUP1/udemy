const CartModel = require("../database/models/Cart");
const UserModel = require('../database/models/Users');

const listCart = async (req, res, next) => {
  const cart = await CartModel.find();
  const user= await UserModel.findById(req.user.user_id);
  const userId=req.user.user_id;
  return res.send(user);
  
};

const addCart = async (req, res, next) => {
  const cart = await CartModel.findById(req.user.user_id);
  if(typeof cart === 'null')
  {
    const newCart = new CartModel({user_id:req.user.user_id})
    newCart.listCarts.push('61e2d7cddf1e49b94d069a84');
    await newCart.save();
  }
  else{
    // cart.listCarts.push();
    console.log('1234');
  }
  return res.send(cart);
  
};

module.exports = {
  listCart,
  addCart
};
