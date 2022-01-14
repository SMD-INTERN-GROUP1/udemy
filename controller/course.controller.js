const Course = require("../database/models/Courses");

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

const getListCourser = async (req, res, next) => {
  const getCourses = await Course.find()
    .then((courses) => {
      res.render("template_instructor/master", {
        title: "Instructor page",
        content: "../instructor_view/instructor_index",
        courses,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const renderCreateCoursePage = async (req, res, next) => {
  res.render("template_instructor/master", {
    title: "Instructor page",
    content: "../course/create",
  });
};

module.exports = {
  getDetailCourse,
  renderCoursePage,
  getListCourser,
  renderCreateCoursePage,
};
