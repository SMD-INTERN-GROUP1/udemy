const UsersModel = require("../database/models/Users");

const renderUserPage = async (req, res, next) => {
  const users = await UsersModel.find();
  res.render("template/master", {
    title: "Admin page",
    content: "../user/user_index",
    users,
  });
};
const toggleWish = async (req, res,next) => {
  const idCourse = req.params.id;
  const user = await UsersModel.findOne({username : req.username});
  const { wishList } = user;
  if (wishList.includes(idCourse)) {
    const newUser = await UsersModel.findByIdAndUpdate(
     user._id ,
      {
        $pull: {
          wishList: idCourse,
        },
      },
    );
    return res.redirect("back");
  } else {
    const newUser = await UsersModel.findByIdAndUpdate(
    user._id ,
      {
        $push: {
          wishList: idCourse,
        },
      },
     
    );
   return res.redirect("back");
  }
};
module.exports = { renderUserPage,toggleWish };
