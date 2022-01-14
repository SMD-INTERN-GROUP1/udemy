const homeRouter = require('./home');
const courseDetailRoute = require('./courses_detail');
const authRouter = require('./auth.route');
const adminRouter = require("./admin");
<<<<<<< HEAD
const registerRouter = require("./register");
const instructorRouter = require("./instructor");

function route(app) {
  //write URL her
  app.use("/instructor", instructorRouter);
  app.use("/course", courseDetailRoute);
  app.use("/admin", adminRouter);
  app.use("/register", registerRouter);
=======
const paypalRouter=require('./payment');
const registerRouter = require('./register');
const authenticateToken= require('../middlerwares/auth.middleware');
const cartRouter=require('./cart');

function route(app) {
  //write URL here
  // app.use(authenticateToken.verifyToken)
  app.use('/course', courseDetailRoute);
  app.use('/pay', paypalRouter);
  app.use("/admin", adminRouter);
  app.use('/cart',cartRouter);
  app.use('/login', authRouter);
  app.use('/register', registerRouter);
>>>>>>> c98683106d4d5d51d4c146d600f1984275e8eb36
  app.use("/", homeRouter);
}

module.exports = route;
