const UsersModel = require("../database/models/Users");
const User = require("../database/models/Users");
const Course = require("../database/models/Courses");
const Progress = require("../database/models/Progress");

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

    let userId = req.cookies.user._id;
    let courseId = course._id;
    let learningProcessOfUser = await Progress.findOne({ userId: userId });
    let user = await User.findOne({ _id : userId });
    let totalVideoFinish = 1;
    // console.log('list', user);

    if(learningProcessOfUser === null) {
      let formData;
      let listProcessCourse = [];
      
      //lấy danh sách khóa học của user 
      for(let iCourses = 0; iCourses < user.courses.length; iCourses++){
        let totalVideo = 0;
        
        let userCourse = await Course.findOne({ _id: user.courses[iCourses]});

        //đếm số lượng video có trong khóa học 
        for(let iChapter = 0; iChapter < userCourse.list_chapter.length; iChapter++){
          totalVideo += userCourse.list_chapter[iChapter].list_video.length;
          console.log('count:', iChapter ,':', totalVideo);
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

      for(let i = 0; i < learningProcessOfUser.listProcessCourse.length; i++) {
        // console.log('parser',  typeof courseId)
        // console.log('parser 2', courseId.toString())

        // console.log('get id', courseId);
        // console.log('id', learningProcessOfUser.listProcessCourse[i].courseId);
        if(learningProcessOfUser.listProcessCourse[i].courseId.toString() == courseId.toString()) {
          console.log('ok');
          console.log(learningProcessOfUser.listProcessCourse[i].totalVideoFinish);
        }
      }


      // console.log('get od', courseId);
      // console.log('id', course._id);
      totalVideoFinish = 2;
    };

    console.log('total video finish: ', totalVideoFinish);

    const list_chapter = await course.list_chapter;
    res.render("component/learning-course", { course, list_chapter, totalVideoFinish });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
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
  createProgress,
  toggleWish,
};
