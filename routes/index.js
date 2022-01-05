const coursesRouter = require("./courses");
const adminRouter = require("./admin");
const homeRouter = require("./home");

function route(app) {
  //write URL here
  app.use("/", homeRouter);
  app.use("/courses", coursesRouter);
  app.use("/admin", adminRouter);
}

module.exports = route;
