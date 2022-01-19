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
  const getListCourses = await Course.find().populate("topic_id");
  res.render("template/master", {
    title: "Topic page",
    content: "../course/course_index",
    getListCourses,
  });
};

const renderTrashCourses = async (req, res, next) => {
  const getCoursesDeleted = await Course.findDeleted({}).populate("topic_id");
  res.render("template/master", {
    title: "Trash courses",
    content: "../trash_view/trash_course",
    getCoursesDeleted,
  });
};

const forceDestroy = async (req, res, next) => {
  const forceCourse = await Course.deleteOne({ _id: req.params.id });
  res.redirect("/admin/trash/courses");
};

module.exports = {
  getDetailCourse,
  renderCoursePage,
  renderTrashCourses,
  forceDestroy,
};
