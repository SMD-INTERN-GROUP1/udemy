const Course = require("../database/models/Courses");
const Topic = require("../database/models/Topics");
const Instrutor = require("../database/models/Instrutor");
const User = require("../database/models/Users");

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

const renderCoursePage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../course/course_index",
  });
};

const getListCourserOfInstructor = async (req, res, next) => {
  const getCoursesOfInstructor = await Course.find({
    author: req.cookies.user.username,
  });
  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    console.log("cookies", req.cookies.user);
    user = req.cookies.user;
  }
  let page = parseInt(req.query.page) || 1;
  let perPage = 6;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  Course.countDocuments((err, count) => {
    if (err) return next(err);
    res.render("template_instructor/master", {
      title: "Instructor page",
      content: "../instructor_view/instructor_index",
      getCoursesOfInstructor: getCoursesOfInstructor.slice(start, end),
      isLogin,
      user,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  });
};

const renderCreateCoursePage = async (req, res, next) => {
  const getTopics = await Topic.find();
  const getInstructor = await Instrutor.findOne({
    user_id: req.cookies.user._id,
  }).populate("user_id");
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
    getInstructor,
  });
};

const create = async (req, res, next) => {
  try {
    const id = req.body.user_id;
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.video_id}/sddefault.jpg`;
    const createCourse = new Course(formData);
    await createCourse.save();
    res.redirect("/instructor");
  } catch (error) {
    console.log(
      "🚀 ~ file: instructor.controller.js ~ line 76 ~ create ~ error",
      error
    );
  }
};

const showCourse = (req, res, next) => {
  const findCourseBySlug = Course.findOne({ slug: req.params.slug })
    .then((course) => {
      res.render("template_instructor/master", {
        title: "Instructor page",
        content: "../instructor_view/instructor_course",
        course,
      });
    })
    .catch(next);
};

const renderUpdateView = (req, res, next) => {
  Promise.all([
    Course.findOne({ slug: req.params.slug }).populate("topic_id"),
    Topic.find(),
  ])
    .then(([courses, getTopics]) => {
      res.render("template_instructor/master", {
        title: "Instructor page",
        content: "../course/update",
        courses,
        getTopics,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const update = async (req, res, next) => {
  try {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.video_id}/sddefault.jpg`;
    const updateCourse = await Course.where({ slug: req.params.slug }).update(
      formData
    );
    res.redirect("/instructor");
  } catch (error) {
    res.status(500).send(error);
  }
};

const destroy = async (req, res, next) => {
  const deleteCourse = await Course.delete({ slug: req.params.slug })
    .then(() => {
      res.redirect("/instructor");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  getDetailCourse,
  renderCoursePage,
  getListCourserOfInstructor,
  renderCreateCoursePage,
  create,
  showCourse,
  destroy,
  renderUpdateView,
  update,
};
