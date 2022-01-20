const { format } = require("timeago.js");
const Course = require("../database/models/Courses");

const Topic = require("../database/models/Topics");

const Chapter = require("../database/models/Chapters");


const Instrutor = require("../database/models/Instrutor");
const User = require("../database/models/Users");


function getDetailCourse(req, res, next) {
  const title = req.params.title;
  Course.findOne({ title: title }, function (err, course) {
    if (!err) {
      res.render("component/course_detail", { course });

const categoryService = require("../services/category.services");
const UserModal = require("../database/models/Users");
const getDetailCourse = async (req, res, next) => {
  const slug = req.params.slug;
  const categories = await categoryService.getListCategory();
  const course = await Course.findOne({ slug: slug });
  let isLogin = false;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
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

const renderCoursePage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../course/course_index",
  });
};


const getListCourserOfInstructor = async (req, res, next) => {
  const getCoursesOfInstructor = await Course.find({
    author: req.cookies.user.username,
  });
  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    console.log("cookies", req.cookies.user);
    user = req.cookies.user;
  }
  let page = parseInt(req.query.page) || 1;
  let perPage = 6;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  Course.countDocuments((err, count) => {
    if (err) return next(err);
    res.render("template_instructor/master", {
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
    console.log("cookies", req.cookies.user);
    user = req.cookies.user;
  }
  res.render("template_instructor/master", {
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
  const course = await Course.findOne({slug: slug});
  const course_id = course._id;
  const listChapter = await Chapter.find({course_id: course_id});
  const findCourseBySlug = await Course.findOne({ slug: req.params.slug })

const showCourse = (req, res, next) => {
  const findCourseBySlug = Course.findOne({ slug: req.params.slug })

    .then((course) => {
      res.render("template_instructor/master", {
        title: "Instructor page",
        content: "../instructor_view/instructor_course",
        course, listChapter
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
      res.render("template_instructor/master", {
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
      res.status(500).json({ msg: error});
    });
};

//chapter
const getChapters = async(req, res, next) => {
  try {
    const slug = req.params.slug;
    const course = await Course.findOne({slug: slug});
    const course_id = course._id;
    const listChapter = await Chapter.find({course_id: course_id});
  } catch(error) {
    res.status(500).json({ msg: error });
  }
}

const createChapter = async(req, res, next) => {
  try {
    //get course id 
    const slug = req.params.slug;
    const course = await Course.findOne({slug: slug});
    let formData = req.body;
    formData.course_id = course._id;
    console.log('formData: ', formData);
    let chapter = new Chapter(formData);
    chapter.save(function(err, data) {
      if(!err) console.log("create successful");
      else console.log(err);
    })
    res.redirect("/instructor");
  } catch(error) {
    console.log('error: ', error);
    res.status(500).json({ msg: error });
  }
}

//video 
const createVideo = async(req, res, next) => {
  try {
    let video_url = '/' + req.file.path.split('\\').slice(6).join('/');
    let formData = req.body;
    Chapter.updateOne({_id: formData.chapters}, 
        {
          $push: {
            list_video: {
              $each: [
                {
                  "video_url": video_url,
                  "title": formData.title,
                  "description": formData.description,
                  "position": formData.position,
                }
              ]
            }
          }
        },
        function(err, data) {
          if(err) console.log('error update: ', err);
          else console.log('update successful!');
        }
      )
    //res.json(req.body);
    res.redirect("/instructor");
  } catch(error) {
    res.json({ msg: error })
  }
}

// create review
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


module.exports = {
  getDetailCourse,
  renderCoursePage,

  getListCourserOfInstructor,
  renderCreateCoursePage,
  create,
  showCourse,
  destroy,
  renderUpdateView,
  update,
  getChapters,
  createChapter,
  createVideo

  getSearch,
  wishListFunc,
  createReview,
  deleteReview,

};
