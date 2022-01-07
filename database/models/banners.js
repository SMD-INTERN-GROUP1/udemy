const mongoose = require("mongoose");
const banners = new mongoose.Schema({
  img: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("banners", banners);
