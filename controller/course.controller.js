const Course = require("../database/models/Courses");
const Topic = require("../database/models/Topics");
<<<<<<< HEAD
const Chapter = require("../database/models/Chapters");

=======
const Instrutor = require("../database/models/Instrutor");
const User = require("../database/models/Users");
>>>>>>> 7a9f0c99740b3aaf598177c7640ed5441e9f79aa

function getDetailCourse(req, res, next) {
  const title = req.params.title;
  Course.findOne({ title: title }, function (err, course) {
    if (!err) {
      res.render("component/course_detail", { course });
    } else {
      console.log(err);
    }
  });
}

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

<<<<<<< HEAD
const showCourse = async (req, res, next) => {
  const slug = req.params.slug;
  const course = await Course.findOne({slug: slug});
  const course_id = course._id;
  const listChapter = await Chapter.find({course_id: course_id});
  const findCourseBySlug = await Course.findOne({ slug: req.params.slug })
=======
const showCourse = (req, res, next) => {
  const findCourseBySlug = Course.findOne({ slug: req.params.slug })
>>>>>>> 7a9f0c99740b3aaf598177c7640ed5441e9f79aa
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
};
