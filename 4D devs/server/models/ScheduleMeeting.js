const mongoose = require("mongoose");

const ScheduleMeeting = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  addictType:{
    type: String,
  },
},{timestamps:true});

module.exports = new mongoose.model("Schedule", ScheduleMeeting);
