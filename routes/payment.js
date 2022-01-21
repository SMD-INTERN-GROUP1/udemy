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
  console.log(listProducts);
  return res.render('component/payment',{listProducts})
});

router.post('/thanhtoan', (req, res) => {
    const items=req.cookies.listPaypal;
    let total=0;
    for(let i=0;i<items.length;i++)
    {
        total+=items[i].price;
    }
    console.log(total);
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
