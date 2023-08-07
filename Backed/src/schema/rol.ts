import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  roltype: { type: String, required: true, unique: false, minlength: 2 },
});
export default mongoose.model("Rol", schema);
