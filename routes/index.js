const homeRouter = require("./home");
const courseDetailRoute = require("./courses_detail");
const adminRouter = require("./admin");
const courseRouter = require("./courses");

function route(app) {
  //write URL here
  app.use("/course", courseDetailRoute);
  app.use("/admin", adminRouter);
  app.use("/courses", courseRouter);
  app.use("/", homeRouter);
}
module.exports = route;
