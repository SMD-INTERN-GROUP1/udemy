const homeRouter = require("./home");
const courseDetailRoute = require("./courses_detail");
const authRouter = require("./auth.route");
const adminRouter = require("./admin");
const registerRouter = require("./register");
const trashRouter = require("./trash");
const instructorRouter = require("./instructor");
const paypalRouter = require("./payment");
const authenticateToken = require("../middlerwares/auth.middleware");
const cartRouter = require("./cart");
const myLearningRouter = require("./my_learning");
const logoutRouter = require("./logout");
const middleware = require("../middlerwares/auth.middleware");
const userRouter = require("./users");

function route(app) {
  //write URL here
  // app.use(authenticateToken.verifyToken)
  app.use("/instructor", instructorRouter);
  app.use("/course", courseDetailRoute);
  app.use("/pay", paypalRouter);
  app.use("/admin", adminRouter);
  app.use("/register", registerRouter);
  app.use("/", homeRouter);
  app.use("/cart", cartRouter);
  app.use("/login", authRouter);
  app.use("/register", registerRouter);
  app.use("/myLearning", myLearningRouter);
  app.use("/logout", logoutRouter);
  app.use("/user", userRouter);
  app.use("/", homeRouter);
  app.use("/admin/trash", trashRouter);
}

module.exports = route;
