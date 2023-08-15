const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  name: { type: String, required: true, unique: false, minlength: 2 },
});
export default mongoose.model("Project", schema);
