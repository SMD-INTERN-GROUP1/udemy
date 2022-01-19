const CartModel = require("../database/models/Cart");
const UserModel = require('../database/models/Users');
const CourseModel = require('../database/models/Courses');

const listCart = async (req, res) => {
 try{
  const userId=req.cookies.user._id;
  const cart = await CartModel.findOne({user_id:userId});
  if(!cart){
    return res.render('component/cart',{list:[]});
  }
  else{
    const list=cart.listCarts;
    const course = await CourseModel.find();
    return res.render('component/cart',{list,course});
  }
 }catch(err){
    console.log(err)
 }
};

const addCart = async (req, res) => {
    try{
      const {id} = req.params;
      const user=req.cookies.user._id;
      const cart = await CartModel.findOne({user_id:user});
      const course = await CourseModel.findById(id);
      if(!cart)
      {
        const newCart = new CartModel({user_id:user})
        console.log('new cart',newCart);
        newCart.listCarts.push(id);
        await newCart.save();
      }
      else{
        const unique= await CartModel.find({listCarts:id});
        if(unique.length===0)
        {
          cart.listCarts.push(id);
          await cart.save();
        }
        console.log('khóa học đã có trong giỏ hàng !');
      }
      res.redirect('back');
    }catch(err){
      console.log(err)
    }
  
};

const removeCart = async (req, res) => {
  try{
    const {id} = req.params;
  const user=req.cookies.user._id;
  const cart = await CartModel.findOne({user_id:user});
  cart.listCarts.delete(id);
  // const course = await CourseModel.findByIdAndDelete(id);
    return res.send(id);
  }catch(err){
    console.log(err)
  }
};

module.exports = {
  listCart,
  addCart,
  removeCart
};
