const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require('express-session');
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
dotenv.config();

var route = require("./routes/index");

// db
mongoose.connect(process.env.MONGODB, function (err) {
  if (!err) {
    console.log("connected sucessfully");
  } else {
    console.log("error");
  }
});

const app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'udemy',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    // secure: true 
  }
}))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

route(app);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
