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

const list_note = new mongoose.Schema({
  video_id:{
    type: mongoose.Schema.Types.ObjectId
  },
  note_time:[note_time]
},{timestamps:true}
);


const note = new mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId
  },
  course_id:{
    type: mongoose.Schema.Types.ObjectId
  },
  note_list:[list_note]
},{timestamps:true}
);

module.exports = mongoose.model("NoteVideo", note);
