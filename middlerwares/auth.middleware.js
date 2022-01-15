const jwt = require("jsonwebtoken");
const User = require("../database/models/Users");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
};

const authInstructor = (req, res, next) => {
  if (!req.cookies.userId) {
    res.redirect("/teaching");
    return;
  }

  var user = User.find({ _id: req.cookies.userId });

  if (!user) {
    res.redirect("/teaching");
    return;
  }

  next();
};

module.exports = { middlewareController, authInstructor };
