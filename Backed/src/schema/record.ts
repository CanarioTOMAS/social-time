const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true, unique: false, minlength: 2 },
});
export default mongoose.model("Record", schema);
