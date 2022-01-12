const homeRouter = require("./home");
const courseDetailRoute = require("./courses_detail");
const adminRouter = require("./admin");
<<<<<<< HEAD
const trashRouter = require("./trash");
=======
const registerRouter = require('./register');
>>>>>>> 0c2cc0440d65468492548a630e4395a95792c524

function route(app) {
  //write URL here
  app.use("/admin/trash", trashRouter);
  app.use("/course", courseDetailRoute);
  app.use("/admin", adminRouter);
  app.use('/register', registerRouter);
  app.use("/", homeRouter);
}

module.exports = route;
