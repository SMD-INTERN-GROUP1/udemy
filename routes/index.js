const homeRouter = require("./home");
const courseDetailRoute = require("./courses_detail");
const adminRouter = require("./admin");
const registerRouter = require("./register");
const instructorRouter = require("./instructor");

function route(app) {
  //write URL her
  app.use("/instructor", instructorRouter);
  app.use("/course", courseDetailRoute);
  app.use("/admin", adminRouter);
  app.use("/register", registerRouter);
  app.use("/", homeRouter);
}

module.exports = route;
