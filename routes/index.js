const homeRouter = require('./home');
const courseDetailRoute = require('./courses_detail');
const authRouter = require('./auth.route');
const adminRouter = require("./admin");
const paypalRouter=require('./payment');
const registerRouter = require('./register');
const cartRouter=require('./cart');
const userRouter = require("./users")
const logoutRouter=require('./logout');
const middleware = require('../middlerwares/auth.middleware');

function route(app) {
  //write URL here
  // app.use(middleware.verifyToken);
  app.use('/course', courseDetailRoute);
  app.use('/pay', paypalRouter);
  app.use("/admin", adminRouter);
  app.use('/', homeRouter);
  app.use('/cart',cartRouter);
  app.use('/login', authRouter);
  app.use('/logout',logoutRouter);
  app.use('/register', registerRouter);
  app.use("/user",userRouter)
  app.use("/", homeRouter);
}

module.exports = route;
