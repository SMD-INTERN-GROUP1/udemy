const mongoose = require("mongoose");

const note_time = new mongoose.Schema({
  time:{
    type: Number,
    default:0,
  },
  content:{
    type: String,
    default:'',
  }
},{timestamps:true}
);

const note = new mongoose.Schema({
  video_id:{
    type:mongoose.Schema.Types.ObjectId
  },
  user_id:{
    type:mongoose.Schema.Types.ObjectId
  },
  note_lists: [note_time],
},{timestamps:true}
);

module.exports = mongoose.model("Note", note);
