const UserModel = require("../database/models/Users");
const RoleModel = require("../database/models/Roles");

// const renderAccountPage = (req, res) => {
//   res.render("dashboard_admin/master", {
//     title: "Admin page",
//     content: "../admin_view/",
//   });
// };

const renderAccountPage = async (req, res, next) => {
  const admins = await UserModel.find({ username: "admin" });
  const roles = await RoleModel.find();
  res.render("dashboard_admin/master", {
    title: "Admin page",
    content: "../admin_view/account",
    roles,
    admins,
  });
};

const renderUpdatePage = async (req, res, next) => {
  const { id } = req.params;
  const admins = await UserModel.findById(id);
  res.render("dashboard_admin/master", {
    title: "Admin page",
    content: "../admin_view/update",
    admins,
  });
};

const updateAccount = async (req, res, next) => {
  try {
    const id = req.cookies.user._id;
    const updateAccount = await UserModel.updateOne(
      { isAdmin: false, _id: id },
      { $set: { isAdmin: true } }
    );
    res.send(updateAccount);
  } catch (e) {}
};

module.exports = { renderAccountPage, renderUpdatePage, updateAccount };
