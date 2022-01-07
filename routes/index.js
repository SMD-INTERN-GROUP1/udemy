const usersRouter = require('./users');
const authRouter = require('./auth.route');
const coursesRouter = require("./courses");
const adminRouter = require("./admin");
const homeRouter = require("./home");

function route(app) {
  //write URL here
  app.use("/", homeRouter);
  app.use("/courses", coursesRouter);
  app.use("/admin", adminRouter);
  app.use('/users', usersRouter);
  app.use('/auth', authRouter); 
  // require('../middlerwares/locals.middleware')(app)
  // app.use(function(req, res, next) {
  //   if(req.session.isAuthenticated===null){
  //     req.session.isAuthenticated=false;
  //   }
  //   res.locals.lcisAuthenticated=req.session.isAuthenticated;
  //   res.locals.lcAuthUser=req.session.authUser;
  //   next();
  // });
}

module.exports = route;
