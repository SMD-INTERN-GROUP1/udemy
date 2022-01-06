const renderCoursePage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../course/index",
  });
};

module.exports = { renderCoursePage };
