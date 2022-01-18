const jwt = require("jsonwebtoken");

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
  verify: (req, res, next) => {
    if (!req.cookies && !req.cookies.user) {
      return res.status(403).json({ messgae: "Please login to continue !" });
    }
    req.username = req.cookies.user;
    next();
  },
};

module.exports = middlewareController;
