const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String, required: true, unique: false, minlength: 2 },
  startTime: { type: String, required: false, unique: false, minlength: 2 },
  endTime: { type: String, required: false, unique: false, minlength: 2 },
  hours: { type: String, required: false, unique: false, minlength: 2 },
},
{
  timestamps: true,
});
export default mongoose.model("Record", schema);
