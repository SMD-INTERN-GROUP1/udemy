const UsersModel = require("../database/models/Users");

const renderUserPage = async (req, res, next) => {
  const users = await UsersModel.find();
  res.render("template/master", {
    title: "Admin page",
    content: "../user/user_index",
    users,
  });
};

module.exports = { renderUserPage };
