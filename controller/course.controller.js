const Course = require("../database/models/course");

function getDetailCourse(req, res, next) {
  const slug = req.params.slug;
  //query, raw query
  Course.findOne({ slug: slug }, function (err, course) {
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
module.exports = {
  getDetailCourse,
  renderCoursePage,
};
