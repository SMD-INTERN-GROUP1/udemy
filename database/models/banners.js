const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const banner = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: true,
    },
    content: {
      type: String,
      default: "",
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
banner.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Banners", banner);
