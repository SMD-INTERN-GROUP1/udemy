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
    const title = req.query.title;
    const data = courses.filter(function (item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
    });
    // paginate
    const productnumber = 4;
    const pages = Math.ceil(data.length / productnumber);
    const page = Number(req.params.page);
    const pagination = data.slice(
      productnumber * page,
      productnumber * (1 + page)
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
