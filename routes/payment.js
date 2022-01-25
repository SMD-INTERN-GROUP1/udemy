const { ObjectId } = require('mongodb');
const UserModel = require('../database/models/Users');
const Cart = require('../database/models/Cart');
const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZlQWdxUbFxt5Vz566Z9lxmlA-EkzApcaWaaVYSQfPI52gkUFh3HErNudlDxc88F_LIJtVIdbq0cBShI',
    'client_secret': 'EB_HyN6R9XSQgznNum1nnO_xvCeiTdyUuPUdUx5OrMknrfv4N7B0UX58dN7keVSFoxY0IxUsVYBDSwAc'
});

router.get('/',(req, res) => {
  const listProducts = req.cookies.listPaypal;
  listProducts.map(x=>x)
  console.log(listProducts);
  return res.render('component/payment',{listProducts})
});

// router.post('/thanhtoan', async (req, res) => {
//     const userID = req.cookies.user._id;
//     const userModel = await UserModel.findOne({_id:userID});
//     const cartModel =  await Cart.findOne({user_id:userID}); 
//     let {courses} = userModel;
//     let {listCarts} = cartModel;
//     let newList=[];
//     newList=courses.concat(listCarts);
//     let convertString=[];
//     for(let i=0;i<newList.length;i++)
//     {
//         convertString.push(newList[i].toString());
//     }
//     let newListChangedConverts = [...new Set(convertString)];
//     try{
//       if(courses.length===0){
//         for(let i=0;i<listCarts.length;i++)
//         {
//           courses.push(listCarts[i]);
//           await userModel.save();          
//         }
//         while(true)
//         {
//           if(listCarts.length===0)
//           {
//             break;
//           }
//           listCarts.pop();
//           await cartModel.save();
//         }
        
//       }else{
//         for(let i=courses.length;i<newListChangedConverts.length;i++)
//         {
//             let convertObject=ObjectId(newListChangedConverts[i]);
//             courses.push(convertObject);
//             await userModel.save();     
//         }
//         while(true)
//         {
//           if(listCarts.length===0)
//           {
//             break;
//           }
//           listCarts.pop();
//           await cartModel.save();
//         }
//       }
//       res.redirect('/');
//     }catch(err){
//       console.log(err);
//     }
// });

router.post('/thanhtoan', (req, res) => {
    const items=req.cookies.listPaypal;
    let newItems=items.map(x=>delete x.img);
    let total=0;
    for(let i=0;i<items.length;i++)
    {
        total+=items[i].price;
    }
    console.log(total,items);
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:4000/pay/success",
          "cancel_url": "http://localhost:4000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": items
          },
          "amount": {
              "currency": "USD",
              "total": `${total}.00`
          },
          "description": "san sale"
      }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
        console.log('payment',payment,payment.transactions[0].item_list,'amount',payment.transactions[0].amount);
    }
  });
});
router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const items=req.cookies.listPaypal;
    let total = 0;
    for(let i=0;i<items.length;i++)
    {
        total+=items[i].price;
    }
    console.log(total, items.length);
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": `${total}.00`
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
