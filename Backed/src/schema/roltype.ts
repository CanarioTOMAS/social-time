const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: false, minlength: 2 },
  description: { type: String, required: false, unique: false, minlength: 2 },
});
export default mongoose.model("RoltypeDB", schema);
