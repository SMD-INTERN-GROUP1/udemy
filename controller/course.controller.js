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
const getSearch = async (req, res, next) => {
  try {
    const courses = await Course.find();
    var title = req.query.title;
    var data = courses.filter(function (item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
    });
    // paginate
    const productPerPage = 2;
    const pages = Math.ceil(data.length / productPerPage);
    const page = Number(req.params.page);
    let pagination = data.slice(
      productPerPage * page,
      productPerPage * (1 + page)
    );
    res.render("search", { pagination, title, pages, result: data.length });
    // res.render("search", {
    //   courses: data,
    //   title,
    // });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getDetailCourse,
  getSearch,
};
