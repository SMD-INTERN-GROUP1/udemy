const UserModel = require("../database/models/Users");
const RoleModel = require("../database/models/Roles");
const CourseModel = require("../database/models/Courses");

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

const renderAdminPage = async (req, res, next) => {
  try {
    const countUsers = await UserModel.find({
      isTeacher: false,
    }).countDocuments();
    console.log(
      "🚀 ~ file: admin.controler.js ~ line 7 ~ renderAdminPage ~ countUsers",
      countUsers
    );

    res.render("dashboard_admin/master", {
      title: "Admin page",
      content: "../dashboard_admin/main_content",
      countUsers,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
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

const blockUser = async (req, res, next) => {
  const blockUser = await UserModel.delete({ _id: req.params.id })
    .then(() => {
      res.redirect("/admin/users");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  renderAccountPage,
  renderUpdatePage,
  updateAccount,
  blockUser,
};
