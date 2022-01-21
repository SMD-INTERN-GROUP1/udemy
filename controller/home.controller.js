const Course = require("../database/models/Courses");
const Banner = require("../database/models/banners");
const Instructor = require("../database/models/Instrutor");
const User = require("../database/models/Users");
const categoryService = require("../services/category.services");

const Topic = require("../database/models/Topics");
const Category = require("../database/models/Categories");
const getHomePage = async (req, res, next) => {
  try {
    let user = req.cookies.user;
    if (typeof user === "undefined") {
      user = "";
    }
    let listCategory = [];
    Course.find()
      .populate("topic_id")
      .exec(async (err, courses) => {
        const categories = await categoryService.getListCategory();
        const banners = await Banner.find();
        if (!err) {
          courses.sort(function (first_course, second_course) {
            let first_category_id = first_course.topic_id.category_id;
            let second_category_id = second_course.topic_id.category_id;
            if (first_category_id < second_category_id) return -1;
            if (first_category_id > second_category_id) return 1;
            else return 0;
          });
          for (let i = 0; i < courses.length; i++) {
            let category_name = await Category.findById(
              courses[i].topic_id.category_id
            );
            if (i === 0) {
              listCategory.push({
                category_id: courses[i].topic_id.category_id,
                category_name: category_name.category,
              });
            } else {
              if (
                courses[i].topic_id.category_id.toString() !==
                courses[i - 1].topic_id.category_id.toString()
              ) {
                listCategory.push({
                  category_id: courses[i].topic_id.category_id,
                  category_name: category_name.category,
                });
              } else {
                continue;
              }
            }
          }
          res.render("index", {
            title: "Udemy",
            user,
            categories,
            banners,
            courses,
            listCategory,
          });
        } else {
          console.log(err);
        }
      });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const renderTeachingPage = async (req, res, next) => {
  const categories = await categoryService.getListCategory();
  let isLogin = false;
  let user;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
  }

  res.render("component/instructor", {
    title: "Instructor page",
    categories,
    isLogin,
    user,
  });
};

const renderTeachingRegister = async (req, res, next) => {
  const categories = await categoryService.getListCategory();

  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    console.log("cookies", req.cookies.user);
    user = req.cookies.user;
  }
  res.render("component/teaching_register", {
    title: "Teaching Register",
    isLogin,
    categories,
    user,
  });
};

const teachingRegister = (req, res, next) => {
  let data;
  const id = req.body.user_id;
  const { specialty, description, experience, user_id } = req.body;
  data = { specialty, description, experience, user_id };
  Promise.all([
    Instructor.create(data),
    User.updateOne(
      { isTeacher: false, _id: id },
      { $set: { isTeacher: true } }
    ),
  ]).then(() => {
    res.redirect("/instructor");
  });
};

module.exports = {
  getHomePage,
  renderTeachingPage,
  renderTeachingRegister,
  teachingRegister,
};
