const UsersModel = require("../database/models/Users");
const Cart = require("../database/models/Cart");
const Course = require("../database/models/Courses");
const Chapter = require("../database/models/Chapters");
const Proccess = require("../database/models/Proccess");

const renderUserPage = async (req, res, next) => {
  const users = await UsersModel.find();
  res.render("dashboard_admin/master", {
    title: "Admin page",
    content: "../user/user_index",
    users,
  });
};

//my learning
const getMyLearning = async (req, res, next) => {
  try {
    //get user id
    //find course by user id
    let isLogin = true;
    let user;
    if (req.cookies.user) {
      isLogin = false;
      console.log("cookies", req.cookies.user);
      user = req.cookies.user;
    }
    let user_id = "61d696d0896327cb23460f8c";
    let cart = await Cart.findOne({ user_id: user_id });
    let list_course = [];
    for (let i = 0; i < cart.listCarts.length; i++) {
      let course = await Course.findById({ _id: cart.listCarts[i] });
      if (course !== null) {
        list_course.push(course);
      }
    }
    res.render("component/my-learning", { list_course });
  } catch (error) {
    console.log("err: ", error);
    res.json({ msg: error });
  }
};

//learning
const getListVideoToLearn = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    const list_chapter = await Chapter.find({ course_id: course._id });
    console.log("This is list_chapter: ", list_chapter);
    res.render("component/learning-course", { course, list_chapter });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createProccess = async (req, res, next) => {
  try {
    let obj = req.body;
    obj.user_id = "61d696d0896327cb23460f8c";
    obj.course_id = "61e2d7cddf1e49b94d069a84";
    console.log(obj);
    let proccessObj = new Proccess(obj);
    console.log("count: ", req.body.count);
    if (req.body.count > 0) {
      proccessObj.save();
    }
  } catch (error) {
    console.log(error);
  }
};
const toggleWish = async (req, res, next) => {
  const idCourse = req.params.id;
  const user = await UsersModel.findOne({ username: req.user.username });
  const { wishList } = user;
  if (wishList.includes(idCourse)) {
    const newUser = await UsersModel.findByIdAndUpdate(user._id, {
      $pull: {
        wishList: idCourse,
      },
    });
    return res.redirect("back");
  } else {
    const newUser = await UsersModel.findByIdAndUpdate(user._id, {
      $push: {
        wishList: idCourse,
      },
    });
    return res.redirect("back");
  }
};
module.exports = {
  renderUserPage,
  getMyLearning,
  getListVideoToLearn,
  createProccess,
  toggleWish,
};
