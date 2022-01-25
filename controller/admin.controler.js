const CourseModel = require("../database/models/Courses");
const UserModel = require("../database/models/Users");

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

module.exports = renderAdminPage;
