const categoryService = require("../services/category.services");
const Course = require('../database/models/Courses');
const Banner = require('../database/models/banners');
const UserModal = require("../database/models/Users");
const getHomePage = async (req, res, next) => {
  const categories = await categoryService.getListCategory();
  const banners = await Banner.find();
  const courses = await Course.find();
  let isLogin=false;
  let newUser
  if(!req.cookies.user){
      isLogin=true;
      console.log('cookies',req.cookies.user);
  }
  else{
     newUser = await UserModal.findOne({
      username: req.cookies.user,
    });
  }

  res.render("index", { title: "Udemy", isLogin, categories, banners, courses,user:newUser});
};

module.exports = {
  getHomePage
};