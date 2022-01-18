const router = require('express').Router();
const categoryService = require("../services/category.services");
const authenticateToken= require('../middlerwares/auth.middleware');
const cartController= require('../controller/cart.controller');

router.get('/',async (req, res) => {
  const listProducts=[
    {
      img:'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg?secure=61v-CB1-N_fVaP4qWcCkQA%3D%3D%2C1642443026',
      title:'Machine Learning A-Z™: Hands-On Python & R In Data Science',
      content:'Learning Python for Data Analysis and Visualization',
      price:'$20.99'
    },
    {
      img:'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg?secure=61v-CB1-N_fVaP4qWcCkQA%3D%3D%2C1642443026',
      title:'Machine Learning A-Z™: Hands-On Python & R In Data Science',
      content:'Learning Python for Data Analysis and Visualization',
      price:'$20.99'
    },
    {
      img:'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg?secure=61v-CB1-N_fVaP4qWcCkQA%3D%3D%2C1642443026',
      title:'Machine Learning A-Z™: Hands-On Python & R In Data Science',
      content:'Learning Python for Data Analysis and Visualization',
      price:'$20.99'
    },
    {
      img:'https://img-b.udemycdn.com/course/240x135/567828_67d0.jpg?secure=61v-CB1-N_fVaP4qWcCkQA%3D%3D%2C1642443026',
      title:'Machine Learning A-Z™: Hands-On Python & R In Data Science',
      content:'Learning Python for Data Analysis and Visualization',
      price:'$20.99'
    }
  ];
  return res.render('component/cart',{listProducts,title:'123'})
});

router.get('/cart123',authenticateToken,cartController.listCart)

router.get('/add',authenticateToken,cartController.addCart)

router.get('/checkout',authenticateToken,async (req, res) => {
  return res.json('thanh toán')
});

module.exports = router;
