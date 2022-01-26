const { ObjectId } = require('mongodb');
const UsersModel = require("../database/models/Users");
const User = require("../database/models/Users");
const Course = require("../database/models/Courses");
const Progress = require("../database/models/Progress");
const Note = require('../database/models/Note');
const NoteVideo = require('../database/models/NoteVideo');
const renderUserPage = async (req, res, next) => {
  const users = await UsersModel.find();
  res.render("dashboard_admin/master", {
    title: "Admin page",
    content: "../user/user_index",
    users,
  });
};

//my learning
const getMyLearning = async (req, res, next) => {
  try {
    //get user id
    //find course by user id
    let isLogin = true;
    let user;
    const userID = req.cookies.user._id;

    if (req.cookies.user) {
      isLogin = false;
      user = req.cookies.user;
    }
    let customer = await User.findOne({ _id: userID });
    // let courseCollection = await Course.find({});
    let { courses } = customer;
    let list_course = [];
    for (let i = 0; i < courses.length; i++) {
      let item = await Course.findById({ _id: courses[i] });
      list_course.push(item);
    }

    let page = parseInt(req.query.page) || 1;
    let perPage = 4;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    Course.countDocuments((err, count) => {
      if (err) return next(err);
      res.render("component/my-learning", {
        list_course,
        list_course: list_course.slice(start, end),
        isLogin,
        user,
        current: page,
        pages: Math.ceil(count / perPage),
      });
    });
  } catch (error) {
    console.log("err: ", error);
    res.json({ msg: error });
  }
};

//learning
const getListVideoToLearn = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    const list_chapter = await course.list_chapter;
    const userID = req.cookies.user._id;
    const note_video = await NoteVideo.findOne({
      user_id:userID,
      course_id:course._id
    });
    const {note_list} = note_video;
    console.log(note_video ,'list',note_list);
    const note = await Note.find({
      user_id:userID,
      video_id:list_chapter[0].list_video[0]._id
    })
    const list_note = await note[0].note_lists;
    res.render("component/learning-course", { course, list_chapter,list_note,note_list});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

// add note video
const createNoteVideo = async(req,res)=>{

};

//progress of course
const createProgress = async (req, res, next) => {
  try {
    let obj = req.body;
    const userId = req.cookies.user._id;
    const course = Course.find({ slug: req.param.lug });
    const courseId = course._id;
    if (req.body.count > 0) {
    }
  } catch (error) {
    console.log(error);
  }
};

const toggleWish = async (req, res, next) => {
  const idCourse = req.params.id;
  const user = await UsersModel.findOne({ username: req.user.username });
  const { wishList } = user;
  // const wishList = user.wishList
  if (wishList.includes(idCourse)) {
    const newUser = await UsersModel.findByIdAndUpdate(user._id, {
      $pull: {
        wishList: idCourse,
      },
    });

    // filter
    // wishList.filter((id) => id !== idCourse)
    // await user.save()

    return res.redirect("back");
  } else {
    const newUser = await UsersModel.findByIdAndUpdate(user._id, {
      $push: {
        wishList: idCourse,
      },
    });
    return res.redirect("back");
  }
};
module.exports = {
  renderUserPage,
  getMyLearning,
  getListVideoToLearn,
  createNoteVideo,
  createProgress,
  toggleWish,
};
