const UsersModel = require("../database/models/Users");
const User = require("../database/models/Users");
const Course = require("../database/models/Courses");
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
      user = req.cookies.user;
    }
    let customer = await User.findOne({ user_id: user._id });
    let list_course = customer.courses;
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
