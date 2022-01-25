const CartModel = require("../database/models/Cart");
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
    let listPaypal=[];
    for(let i=0;i<course.length;i++)
    {
      for(let j=0;j<list.length;j++)
      {
          if(course[i]._id.toString()=== list[j].toString())
          {
            let form={
                img: course[i].image,
                name: course[i].title,
                price: course[i].price_discount > 0 ? course[i].price_discount : course[i].price,
                currency: 'USD',
                quantity: 1
            }
            listPaypal.push(form);
          }
      }
    }
    // let handleString = JSON.stringify(listPaypal);
    
    res.cookie("listPaypal", listPaypal, {
      httpOnly: true,
      sameSite: "strict",
  })
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
      if(!cart)
      {
        const newCart =await new CartModel({user_id:user})
        newCart.listCarts.push(id);
        await newCart.save();
      }
      else{ 
        const {listCarts} = cart ;
        if(!listCarts.includes(id))
        {
          cart.listCarts.push(id);
          await cart.save();
        }
        else{
          console.log('khóa học đã có trong giỏ hàng !');
        }
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
    const {listCarts} = cart;
    if(listCarts.includes(id))
    {
      const newCart = await CartModel.findByIdAndUpdate(
        cart,
        {
          $pull: {
            listCarts: id,
          },
        },
        );
    }
    return res.redirect('back');
  }catch(err){
    console.log(err)
  }
};

module.exports = {
  listCart,
  addCart,
  removeCart
};
