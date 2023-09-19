const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  deleted: { type: Boolean, required: false, unique: false },
  description: { type: String, required: true, unique: false, minlength: 2 },
});
export default mongoose.model("Project", schema);
