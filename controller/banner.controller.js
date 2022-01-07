const BannersModel = require("../database/models/banners");

const renderBannerPage = async (req, res, next) => {
  const banners = await BannersModel.find();
  res.render("template/master", {
    title: "Admin page",
    content: "../banner/index",
    banners,
  });
};

module.exports = { renderBannerPage };
