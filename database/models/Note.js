const mongoose = require("mongoose");

const note = new mongoose.Schema({
  video_id:{
    type:mongoose.Schema.Types.ObjectId
  },
  user_id:{
    type:mongoose.Schema.Types.ObjectId
  },
  note_lists: [
    {
      type: mongoose.Schema.Types.ObjectId
    },
  ],
},{timestamps:true}
);

module.exports = mongoose.model("Note", note);
