const homeService = require("../services/home.services");

function getHomePage(req, res, next) {
  res.render("index", { title: "Group1 SMD Number one" });
}

const renderHomePage = async (req, res, next) => {
  const categories = await homeService.findAll();
  res.render("index", { title: "Udemy", categories });
};

const renderCoursePage = async (req, res, next) => {
  const categories = await homeService.findAll();
  res.render("component/topic", { title: "Course in Udemy", categories });
};
module.exports = {
  getHomePage,
  renderHomePage,
  renderCoursePage,
};
