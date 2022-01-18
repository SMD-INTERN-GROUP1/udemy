const Course = require("../database/models/Courses");
const categoryService = require("../services/category.services");
const UserModal = require("../database/models/Users");
function getDetailCourse(req, res, next) {
  const title = req.params.title;
  //query, raw query
  Course.findOne({ title: title }, function (err, course) {
    if (!err) {
      res.render("component/course_detail", { course });
    } else {
      console.log(err);
    }
  });
}
const getSearch = async (req, res, next) => {
  try {
    const categories = await categoryService.getListCategory();
    const courses = await Course.find();
    const title = req.query.title;
    const data = courses.filter(function (item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
    });

    // req.query.sort["fieldname"] =  asc | desc

    // paginate
    const productnumber = 4;
    const total_pages = Math.ceil(data.length / productnumber);
    const num = Number(req.params.page);
    const pagination = data.slice(
      productnumber * num,
      productnumber * (1 + num)
    );
    let user;
    let isLogin = false;
    if (!req.cookies.user) {
      isLogin = true;
    } else {
       user = await UserModal.findOne({ username: req.cookies.user });
    }

    const sort = req.query.sort;
    if (sort) {
      const keys = Object.keys(req.query.sort)[0];

      pagination.sort((objecta, objectb) => {
        return sort[keys] === "asc"
          ? objecta.price - objectb.price
          : objectb.price - objecta.price;
      });
    }

    res.render("search", {
      categories,
      pagination,
      title,
      total_pages,
      result: data.length,
      isLogin,
      user
    });
  } catch (error) {
    console.log(error.message);
  }
};

const renderCoursePage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../course/course_index",
  });
};

const wishListFunc = async (req, res) => {
  const categories = await categoryService.getListCategory();
  let isLogin = false;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
  }
  const user = await UserModal.findOne({
    username: req.cookies.user,
  }).populate("wishList");

  const newUser = await UserModal.findOne({
    username: req.cookies.user,
  });
   
  res.render("wish", {
    wishList: user.wishList,
    isLogin,
    user : newUser,
    lengthlist:user.wishList.length,
    categories
  });
};
module.exports = {
  getDetailCourse,
  renderCoursePage,
  getSearch,
  wishListFunc,
};
