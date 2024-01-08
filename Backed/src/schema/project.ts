const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  clientDB: { type: mongoose.Schema.Types.ObjectId, ref: "ClientDB" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  deleted: { type: Boolean, required: false, unique: false },
  description: { type: String, required: true, unique: false, minlength: 2 },
  activityDB: [{ type: mongoose.Schema.Types.ObjectId, ref: "ActivityDB" }],
});
export default mongoose.model("ProjectDB", schema);
