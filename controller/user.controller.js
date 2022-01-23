const UsersModel = require("../database/models/Users");
const User = require("../database/models/Users");
const Course = require("../database/models/Courses");
const Proccess = require("../database/models/Proccess");
const Courses = require("../database/models/Courses");

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
    const userID = req.cookies.user._id;
   
    if (req.cookies.user) {
      isLogin = false;
      user = req.cookies.user;
    }
    let customer = await User.findOne({_id: userID });
    // let courseCollection = await Course.find({});
    let {courses} = customer;
    let list_course=[];
    for(let i=0;i<courses.length;i++)
    {
      let item = await Course.findById({_id:courses[i]});
      list_course.push(item);
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

    const list_chapter = await course.list_chapter;
    console.log('list chapter: ', list_chapter);

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
  // const wishList = user.wishList
  if (wishList.includes(idCourse)) {
    const newUser = await UsersModel.findByIdAndUpdate(user._id, {
      $pull: {
        wishList: idCourse,
      },
    });

    // filter
    // wishList.filter((id) => id !== idCourse)
    // await user.save()

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
