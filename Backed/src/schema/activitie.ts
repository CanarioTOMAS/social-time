import mongoose from "mongoose";

const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: false, unique: false, minlength: 2 },
  description: { type: String, required: false, unique: false, minlength: 2 },
  tiempoEstimado: { type: String, required: false, unique: false, minlength: 2 },
  costoHora: { type: String, required: false, unique: false, minlength: 2 },
  periocidad: { type: String, required: false, unique: false, minlength: 2 },
  record: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
  colaboradores: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});
export default mongoose.model("Activities", schema);
