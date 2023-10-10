const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activities" }],
  name: { type: String, required: true, unique: false, minlength: 2 },
  deleted: { type: Boolean, required: false, unique: false },
});
export default mongoose.model("Record", schema);
