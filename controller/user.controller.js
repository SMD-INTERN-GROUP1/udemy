const { ObjectId } = require('mongodb');
const UsersModel = require("../database/models/Users");
const User = require("../database/models/Users");
const Course = require("../database/models/Courses");
const Progress = require("../database/models/Progress");
const Note = require('../database/models/Note');

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
    let isLogin = true;
    let user;
    const userID = req.cookies.user._id;

    if (req.cookies.user) {
      isLogin = false;
      user = req.cookies.user;
    }
    let customer = await User.findOne({ _id: userID });
    let { courses } = customer;
    let list_course = [];
    for (let i = 0; i < courses.length; i++) {
      let item = await Course.findById({ _id: courses[i] });
      if(item !== null) {
        list_course.push(item);
      }
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

    let userId = req.cookies.user._id;
    let courseId = course._id;
    let totalVideoFinish = 1;

    const list_chapter = await course.list_chapter;
    // const note = await Note.find({
    //   user_id:userId,
    //   video_id:list_chapter[0].list_video[0]._id
    // })
    // const list_note = await note[0].note_lists;
    // console.log(note);

    const learningProcessOfUser = await Progress.findOne({ userId: userId });
    const user = await User.findOne({ _id : userId });

    if(learningProcessOfUser === null) {
      let formData;
      let listProcessCourse = [];
      
      //lấy danh sách khóa học của user 
      for(let iCourses = 0; iCourses < user.courses.length; iCourses++){
        let totalVideo = 0;
        const userCourse = await Course.findOne({ _id: user.courses[iCourses]});

        //đếm số lượng video có trong khóa học 
        for(let iChapter = 0; iChapter < userCourse.list_chapter.length; iChapter++){
          totalVideo += userCourse.list_chapter[iChapter].list_video.length;
          console.log('count:', iChapter + 1 ,':', totalVideo);
        }

        listProcessCourse.push({
          courseId: userCourse._id,
          totalVideo: totalVideo
        })
      }
      // console.log('process:', listProcessCourse);

      formData = {
        userId: req.cookies.user._id,
        listProcessCourse: listProcessCourse
      }

      //save in db
      const createProcessCourse = new Progress(formData);
      await createProcessCourse.save();
    } else {
      let totalVideoInCourse = 0;
      let totalVideoInProcess = 0;

      //tổng số lượng video có trong course
      for(let iChapter = 0; iChapter < course.list_chapter.length; iChapter++){
        totalVideoInCourse += course.list_chapter[iChapter].list_video.length;
        console.log('count:', iChapter + 1 ,':', totalVideoInCourse);
      }

      //tổng số video có trong process
      for(let i = 0; i < learningProcessOfUser.listProcessCourse.length; i++) {
        if(learningProcessOfUser.listProcessCourse[i].courseId.toString() == courseId.toString()) {
          totalVideoInProcess = learningProcessOfUser.listProcessCourse[i].totalVideo;
          break;
        }
      }
      console.log('totalVideoInCourse: ', totalVideoInCourse, 'totalVideoInProcess: ', totalVideoInProcess );

      //check số lượng video giữa course và process
      //nếu khác nhau thì update số lượng trong Process
      if(totalVideoInCourse !== totalVideoInProcess) {
        Progress.updateOne(
          { userId : userId, 'listProcessCourse.courseId': courseId}, 
          {$set: {"listProcessCourse.$.totalVideo": totalVideoInCourse}}, 
          function(err, data) {
            if(err)
              console.log(err);
          }
        );
      }

      //Lấy totalVideoFinish
      for(let i = 0; i < learningProcessOfUser.listProcessCourse.length; i++) {
        if(learningProcessOfUser.listProcessCourse[i].courseId.toString() == courseId.toString()) {
          totalVideoFinish = learningProcessOfUser.listProcessCourse[i].totalVideoFinish;
          break;
        }
      }
    };

    console.log('total video finish: ', totalVideoFinish);

    res.render("component/learning-course", { course, list_chapter, totalVideoFinish });
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
