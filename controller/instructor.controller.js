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

const showCourse = async (req, res, next) => {
  const findCourseBySlug = await Course.findOne({ slug: req.params.slug })
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
  getListCourser,
  renderCreateCoursePage,
  create,
  showCourse,
  destroy,
  renderUpdateView,
  update,
};