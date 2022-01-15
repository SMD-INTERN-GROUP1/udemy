const Instructor = require("../database/models/Instrutor");
const Course = require("../database/models/Courses");
const Topic = require("../database/models/Topics");

const getListCourser = async (req, res, next) => {
  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    console.log("cookies", req.cookies.user);
    user = req.cookies.user;
  }
  const getCourses = await Course.find()
    .then((courses) => {
      res.render("template_instructor/master", {
        title: "Instructor page",
        content: "../instructor_view/instructor_index",
        courses,
        isLogin,
        user,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const renderCreateCoursePage = async (req, res, next) => {
  const getTopics = await Topic.find();
  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    console.log("cookies", req.cookies.user);
    user = req.cookies.user;
  }
  res.render("template_instructor/master", {
    title: "Instructor page",
    content: "../course/create",
    getTopics,
    isLogin,
    user,
  });
};

const create = async (req, res, next) => {
  try {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.video_id}/sddefault.jpg`;
    const createCourse = new Course(formData);
    await createCourse.save();
    // res.send(createCourse);
    res.redirect("/instructor");
  } catch (error) {
    console.log(
      "🚀 ~ file: instructor.controller.js ~ line 76 ~ create ~ error",
      error
    );
  }
};

module.exports = {
  getListCourser,
  renderCreateCoursePage,
  create,
};
