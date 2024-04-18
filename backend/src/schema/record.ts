import { Kind } from "graphql";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  activities: { type: mongoose.Schema.Types.ObjectId, ref: "Activities" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  inicio: { type: Date, required: true, unique: false, minlength: 2 },
  fin: { type: Date, required: true, unique: false, minlength: 2 },
  descriptions: { type: String, required: true, unique: false, minlength: 2 },
  deleted: { type: Boolean, required: false, unique: false },
  totalHours:{ type: Date, required: true, unique: false, minlength: 2 },
});
export default mongoose.model("Record", schema);


