import mongoose from "mongoose";

const schema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  tiempoEstimado: { type: String, required: false, unique: false, minlength: 2 },
  costoHora: { type: String, required: false, unique: false, minlength: 2 },
  periocidad: { type: String, required: false, unique: false, minlength: 2 },
  record: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
  colaboradores: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});
export default mongoose.model("ActivitiesDB", schema);
