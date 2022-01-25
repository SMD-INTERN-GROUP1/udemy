const { json } = require("express");
const Courses = require("../database/models/Courses");
const createQuestion = async (req, res) => {
  const { question, result, answer_1, answer_2, answer_3, answer_4 } = req.body;
  const course = await Courses.findById(req.params.idCourse);
  if (!course)
    return res
      .status(400)
      .json({ success: false, msg: "Couse is not found !" });

  if (course.questions === null || course.questions === undefined) {
    course.questions = [];
  }
  const newQuestion = {
    question,
    result: Number(result),
    answer_1,
    answer_2,
    answer_3,
    answer_4,
  };
  course.questions.push(newQuestion);
  console.log(course);
  await course.save();
  return res.redirect("back");
};

const checkQuestion = async (req, res) => {
  const course = await Courses.findById(req.params.idCourse);
  if (!course)
    return res
      .status(400)
      .json({ success: false, msg: "Couse is not found !" });
  const questions = course.questions;
  let trueNumber = 0;
  for (const [key, value] of Object.entries(req.body)) {
    const question = questions.find(
      (q) => JSON.stringify(q._id) === JSON.stringify(key)
    );
    if (question && question.result === Number(value)) {
      trueNumber++;
    }
  }
  const mark = (trueNumber / questions.length) * 100;
  console.log(mark);
  return res.render("quizforuser/checkanswer", {
    trueNumber,
    mark,
  });
};

const deleteQuestion = async (req, res) => {
  const course = await Courses.findById(req.params.idCourse);
  if (!course)
    return res
      .status(400)
      .json({ success: false, msg: "Couse is not found !" });

  const questions = course.questions;

  if (course.questions === null || course.questions === undefined) {
    course.questions = [];
    await course.save();
    return res.redirect("back");
  }

  const index = questions.findIndex(
    (q) => JSON.stringify(q._id) === JSON.stringify(req.params.id)
  );

  if (index === -1) {
    return res.redirect("back");
  }
  course.questions.splice(index, 1);
  await course.save();
  return res.redirect("back");
};

const test = async (req, res) => {
  const course = await Courses.findOne({ slug: req.params.slug });
  return res.render("quizforuser/quizuser", {
    questions: course.questions,
    idCourse: course._id,
  });
};
const admintest = async (req, res) => {
  const course = await Courses.findOne({ slug: req.params.slug });
  if (!course)
    return res
      .status(400)
      .json({ success: false, msg: "Couse is not found !" });
  res.render("dashboard_instructor/master", {
    title: "Instructor page",
    content: "../quizforuser/adminquiz",
    questions: course.questions,
    idCourse: course._id,
    slug: course.slug,
  });
};
module.exports = {
  createQuestion,
  test,
  checkQuestion,
  admintest,
  deleteQuestion,
};
