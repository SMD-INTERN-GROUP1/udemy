const mongoose = require("mongoose");

const NoteTime = new mongoose.Schema({
  note_id:{
    type: mongoose.Schema.Types.ObjectId
  },
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

module.exports = mongoose.model("NoteTime", NoteTime);
