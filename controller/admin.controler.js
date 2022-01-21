const renderAdminPage = (req, res, next) => {
  res.render("dashboard_admin/master", {
    title: "Admin page",
    content: "../dashboard_admin/main_content",
  });
};

module.exports = renderAdminPage;
