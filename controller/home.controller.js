const categoryService = require("../services/category.services");
const Course = require('../database/models/Courses');
const Banner = require('../database/models/banners');

const getHomePage = async (req, res, next) => {
  const categories = await categoryService.getListCategory();
  const banners = await Banner.find();
  const courses = await Course.find();
  let user=req.cookies.user;
  if(typeof user === 'undefined')
  {
      user='';
  }
  res.render("index", { title: "Udemy" , user, categories, banners, courses});
};

module.exports = {
  getHomePage
};