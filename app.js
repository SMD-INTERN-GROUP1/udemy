const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const paypal = require('paypal-rest-sdk');
// const session = require('express-session');
const methodOverride = require('method-override')
const mongoose = require("mongoose");

dotenv.config();

const route = require("./routes/index");
// db
mongoose.connect(process.env.MONGO_DB ,function(err){
  if(!err){
    console.log('connected sucessfully');
  }
  else{
    console.log('error');
  }
});

//sesstion

// app.set('trust proxy', 1) 
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))



const app = express();
app.use(methodOverride('_method'))

//payment
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'AZlQWdxUbFxt5Vz566Z9lxmlA-EkzApcaWaaVYSQfPI52gkUFh3HErNudlDxc88F_LIJtVIdbq0cBShI',
//   'client_secret': 'EB_HyN6R9XSQgznNum1nnO_xvCeiTdyUuPUdUx5OrMknrfv4N7B0UX58dN7keVSFoxY0IxUsVYBDSwAc'
// });


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));


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
