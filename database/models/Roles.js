const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// mongoose.connect(process.env.MONGO_DB, function (err) {
//   if (!err) {
//     console.log("connected sucessfully");
//   } else {
//     console.log("error");
//   }
// });

const Schema = mongoose.Schema;

const role = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const RoleModel = mongoose.model("Role", role);

// RoleModel.find({}).then((data) => {
//   console.log("🚀 ~ file: Roles.js ~ line 33 ~ RoleModel.find ~ data", data);
// });

// RoleModel.create({
//   name: "supAdmin",
//   description: "Role super admin",
// });

module.exports = RoleModel;
