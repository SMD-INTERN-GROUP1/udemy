const BannersModel = require("../database/models/banners");

const renderBannerPage = async (req, res, next) => {
  const banners = await BannersModel.find();
  res.render("template/master", {
    title: "Admin page",
    content: "../banner/banner_index",
    banners,
  });
};

const renderCreateView = async (req, res, next) => {
  res.render("template/master", {
    title: "Admin page",
    content: "../banner/create",
  });
};

const create = async (req, res, next) => {
  let data;
  const { title, content, img } = req.body;
  data = { title, content, img };
  const createBanner = new BannersModel(data);
  await createBanner
    .save()
    .then((banner) => {
      res.send(banner);
      // res.redirect("/admin/banners");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = { renderBannerPage, renderCreateView, create };
