const express = require("express");
const Router = express.Router();
const questionController = require("../controller/questionController");

/* Router.post("/check/:idCourse",  questionController.checkQuestion) */
Router.post("/:idCourse", questionController.createQuestion);
Router.delete("/deleteQuestion/:idCourse/:id",questionController.deleteQuestion)
/* Router.get("/quiz/:slug", questionController.test); */

module.exports = Router;
