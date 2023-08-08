import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  address: { type: String, required: false, unique: false, minlength: 2 },
  category: { type: String, required: false, unique: false, minlength: 2 },
  email: { type: String, required: false, unique: false, minlength: 2 },
  image: { type: String, required: false, unique: false },
  phone: { type: String, required: false, unique: false, minlength: 2 },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
},
{
  timestamps: true,
});
export default mongoose.model("Business", schema);
