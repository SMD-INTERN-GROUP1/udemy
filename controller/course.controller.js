const Course = require("../database/models/Course");

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
    content: "../course/index",
  });
};
module.exports = {
  getDetailCourse,
  renderCoursePage,
};
