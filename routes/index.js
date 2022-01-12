const homeRouter = require('./home');
const courseDetailRoute = require('./courses_detail');
const adminRouter = require("./admin");
const searchRouter = require("./search");
function route(app) {
  //write URL here
  app.use('/course', courseDetailRoute);
  app.use("/admin", adminRouter);
  app.use("/search", searchRouter);
  app.use('/', homeRouter);
}
module.exports = route;
