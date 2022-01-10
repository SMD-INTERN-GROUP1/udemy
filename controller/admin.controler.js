const renderAdminPage = async (req, res, next) => {
  res.render("template/master", {
    title: "Admin page",
    content: "../admin_view/admin_index",
  });
};

module.exports = { renderAdminPage };
