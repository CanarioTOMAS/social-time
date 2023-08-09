const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  projects: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  tiempoEstimado: { type: String, required: true, unique: false, minlength: 2 },
  costoHora: { type: String, required: true, unique: false, minlength: 2 },
  periocidad: { type: String, required: true, unique: false, minlength: 2 }
  
});
export default mongoose.model("Activities", schema);
