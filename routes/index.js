const homeRouter = require('./home');
const courseDetailRoute = require('./courses_detail');
const authRouter = require('./auth.route');
const adminRouter = require("./admin");
const paypalRouter=require('./payment');

function route(app) {
  //write URL here
  app.use('/course', courseDetailRoute);
  app.use('/pay', paypalRouter);
  app.use('/auth', authRouter);
  app.use("/admin", adminRouter);
  app.use('/', homeRouter);
}
module.exports = route;
