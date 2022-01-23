const Course = require("../database/models/Courses");
const Topic = require("../database/models/Topics");
const Video = require("../database/models/Videos");
const Instrutor = require("../database/models/instructor");
const { format } = require("timeago.js");
const categoryService = require("../services/category.services");
const UserModal = require("../database/models/Users");

const getDetailCourse = async (req, res, next) => {
  const slug = req.params.slug;
  const categories = await categoryService.getListCategory();
  const course = await Course.findOne({ slug: slug });
  let isLogin = false;
  if (!req.cookies.user) {
    isLogin = true;
  }
  course.reviews &&
    course.reviews.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  res.render("component/course_detail", {
    course,
    categories,
    isLogin,
    format,
    user: (await UserModal.findById(req.cookies.user?._id)) || null,
  });
};

const renderCoursePage = async (req, res, next) => {
  const getListCourses = await Course.find().populate("topic_id");
  res.render("dashboard_admin/master", {
    title: "Topic page",
    content: "../course/course_index",
    getListCourses,
  });
};

const renderTrashCourses = async (req, res, next) => {
  const getCoursesDeleted = await Course.findDeleted({}).populate("topic_id");
  res.render("dashboard_admin/master", {
    title: "Trash courses",
    content: "../trash_view/trash_course",
    getCoursesDeleted,
  });
};

const forceDestroy = async (req, res, next) => {
  const forceCourse = await Course.deleteOne({ _id: req.params.id });
  res.redirect("/admin/trash/courses");
};

const getListCourserOfInstructor = async (req, res, next) => {
  const getCoursesOfInstructor = await Course.find({
    author: req.cookies.user.username,
  });
  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    user = req.cookies.user;
  }
  let page = parseInt(req.query.page) || 1;
  let perPage = 3;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  Course.countDocuments((err, count) => {
    if (err) return next(err);
    res.render("dashboard_instructor/master", {
      title: "Instructor page",
      content: "../instructor_view/instructor_index",
      getCoursesOfInstructor: getCoursesOfInstructor.slice(start, end),
      isLogin,
      user,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  });
};

const renderCreateCoursePage = async (req, res, next) => {
  const getTopics = await Topic.find();
  const getInstructor = await Instrutor.findOne({
    user_id: req.cookies.user._id,
  }).populate("user_id");
  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    user = req.cookies.user;
  }
  res.render("dashboard_instructor/master", {
    title: "Instructor page",
    content: "../course/create",
    getTopics,
    isLogin,
    user,
    getInstructor,
  });
};

const create = async (req, res, next) => {
  try {
    const id = req.body.user_id;
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.video_id}/sddefault.jpg`;
    // formData.course_image = req.file.path;
    // console.log(req.file);
    const createCourse = new Course(formData);
    await createCourse.save();
    res.redirect("/instructor");
  } catch (error) {
    console.log(
      "🚀 ~ file: instructor.controller.js ~ line 76 ~ create ~ error",
      error
    );
  }
};

const showCourse = async (req, res, next) => {
  const slug = req.params.slug;
  const course = await Course.findOne({ slug: slug });
  const listChapter = course.list_chapter;
  const listVideo = listChapter.list_video;
  console.log(listVideo);
  const findCourseBySlug = await Course.findOne({ slug: req.params.slug })
    .then((course) => {
      res.render("dashboard_instructor/master", {
        title: "Instructor page",
        content: "../instructor_view/instructor_course",
        course,
        listChapter,
      });
    })
    .catch(next);
};

const renderUpdateView = (req, res, next) => {
  Promise.all([
    Course.findOne({ slug: req.params.slug }).populate("topic_id"),
    Topic.find(),
  ])
    .then(([courses, getTopics]) => {
      res.render("dashboard_instructor/master", {
        title: "Instructor page",
        content: "../course/update",
        courses,
        getTopics,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const update = async (req, res, next) => {
  try {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.video_id}/sddefault.jpg`;
    const updateCourse = await Course.where({ slug: req.params.slug }).update(
      formData
    );
    res.redirect("/instructor");
  } catch (error) {
    res.status(500).send(error);
  }
};

const destroy = async (req, res, next) => {
  const deleteCourse = await Course.delete({ slug: req.params.slug })
    .then(() => {
      res.redirect("/instructor");
    })
    .catch((error) => {
      res.status(500).json({ msg: error });
    });
};

//chapter

const createChapter = async (req, res, next) => {
  try {
    //get course id
    const slug = req.params.slug;
    const course = await Course.findOne({ slug: slug });
    let formData = req.body;
    Course.updateOne(
      { _id: course._id },
      {
        $push: {
          list_chapter: {
            $each: [
              {
                title: formData.title,
                chapter_position: formData.chapter_position,
              },
            ],
          },
        },
      },
      function (err, data) {
        if (err) {
          console.log("error create chapter: ", err);
        }
      }
    );
    res.redirect("/instructor/courses/" + slug);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ msg: error });
  }
};

//video
const createVideo = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const course = await Course.findOne({ slug: slug });
    let chapter_id = req.body.chapter_id;
    let video_url = "/" + req.file.path.split("\\").slice(6).join("/");
    let formData = req.body;
    let a = 2;
    Course.updateOne(
      { _id: course._id, "list_chapter._id": chapter_id },
      {
        $push: {
          "list_chapter.$[c].list_video": {
            title: formData.title,
            video_position: formData.video_position,
            description: formData.description,
            video_url: video_url,
          },
        },
      },
      { arrayFilters: [{ "c._id": chapter_id }] },
      function (err, data) {
        if (err) console.log("upload video ko đc: ", err);
      }
    );
    //res.json(req.body);
    res.redirect("/instructor/courses/" + slug);
  } catch (error) {
    res.json({ msg: error });
  }
};
const wishListFunc = async (req, res) => {
  const categories = await categoryService.getListCategory();
  let isLogin = false;
  if (!req.user.username) {
    isLogin = true;
  }
  const user = await UserModal.findOne({
    username: req.user.username,
  }).populate("wishList");

  const newUser = await UserModal.findOne({
    username: req.user.username,
  });
  return res.render("wish", {
    wishList: user.wishList,
    isLogin,
    user: newUser,
    lengthlist: user.wishList.length,
    categories,
  });
};

const createReview = async (req, res) => {
  const { comment, rate } = req.body;
  if (!comment || !rate) {
    return res.redirect("back");
  }
  const course = await Course.findById(req.params.id);
  const user = await UserModal.findOne({ username: req.cookies.user.username });

  if (!course) {
    return res.status(400).json({ err: "course is not exist !" });
  }

  const newReview = {
    comment,
    rate,
    name: user.username,
    user: user._id,
    createdAt: Date.now(),
  };

  // course.reviews = [];
  // await course.save();

  course.reviews.push(newReview);

  course.numberReview = course.reviews.length;

  course.rating =
    course.reviews.reduce((total, review) => {
      return total + review.rate;
    }, 0) / course.reviews.length;

  await course.save();

  return res.redirect("back");
};

const deleteReview = async (req, res) => {
  const course = await Course.findById(req.params.idCourse);
  const user = await UserModal.findOne({ username: req.cookies.user.username });

  if (!course) {
    return res.status(400).json({ err: "course is not exist !" });
  }

  // await course.updateOne({
  //   $pull: {
  //     reviews: req.params.id,
  //   },
  // });
  // number, boolean, string
  // object, funtion, array => const a = {a : ""}

  // void afunc(* ){ num = 3 }
  // int a = 4;
  // afunc(a)

  const index = course.reviews.findIndex((review) => {
    return review._id == req.params.id;
  });
  if (index !== -1) {
    if (
      JSON.stringify(user._id) != JSON.stringify(course.reviews[index].user)
    ) {
      return res
        .status(400)
        .json({ err: "You can not delete review of the other people !" });
    }
    course.reviews.splice(index, 1);
  }

  if (course.reviews.length > 0) {
    course.numberReview = course.reviews.length;

    course.rating =
      course.reviews.reduce((total, review) => {
        return total + Number(review.rate);
      }, 0) / course.reviews.length;
  } else {
    course.numberReview = 0;

    course.rating = 0;
  }

  await course.save();
  return res.redirect("back");
};

const getSearch = async (req, res, next) => {
  try {
    const categories = await categoryService.getListCategory();
    const courses = await Course.find();

    const title = req.query.title;
    const data = courses.filter(function (item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
    });

    // req.query.sort["fieldname"] =  asc | desc

    const productnumber = 4;
    const total_pages = Math.ceil(data.length / productnumber);
    const num = Number(req.params.page);
    const pagination = data.slice(
      productnumber * num,
      productnumber * (1 + num)
    );
    let isLogin = false;
    let userSearch;

    if (!req.cookies.user) {
      req.cookies.user = {};

      if (!req.cookies.user.username) isLogin = true;
    } else {
      if (req.cookies.user._id)
        userSearch = await UserModal.findById(req.cookies.user._id);
    }

    const sort = req.query.sort;
    if (sort) {
      const keys = Object.keys(req.query.sort)[0];

      pagination.sort((objecta, objectb) => {
        return sort[keys] === "asc"
          ? objecta.price - objectb.price
          : objectb.price - objecta.price;
      });
    }
    res.render("search", {
      categories,
      pagination,
      title,
      total_pages,
      result: data.length,
      isLogin,
      user: userSearch || { wishList: [] },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getDetailCourse,
  renderCoursePage,
  renderTrashCourses,
  forceDestroy,
  getListCourserOfInstructor,
  renderCreateCoursePage,
  create,
  showCourse,
  destroy,
  renderUpdateView,
  update,
  createChapter,
  createVideo,
  wishListFunc,
  getSearch,
  deleteReview,
  createReview,
};
