const homeRouter = require('./home');
const courseDetailRoute = require('./courses_detail');
const authRouter = require('./auth.route');
const adminRouter = require("./admin");
const paypalRouter=require('./payment');
const registerRouter = require('./register');
const userRouter = require('./user');
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
  app.use('/user', userRouter)
  app.use("/", homeRouter);
}

module.exports = route;
