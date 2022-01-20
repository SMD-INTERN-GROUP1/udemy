const express = require('express');

const router = express.Router();

router.get('/',(req, res) => {
  return res.render('component/payment')
});

router.post('/', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:4000/success",
        "cancel_url": "http://localhost:4000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      // for(let i = 0;i < payment.links.length;i++){
      //   if(payment.links[i].rel === 'approval_url'){
      //     res.redirect(payment.links[i].href);
      //   }
      // }
      console.log('payment',payment);
  }
});

});

module.exports = router;
