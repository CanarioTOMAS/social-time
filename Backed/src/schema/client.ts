const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  image: { type: String, required: false, unique: false, minlength: 2 },
  city: { type: String, required: false, unique: false, minlength: 3 },
  address: { type: String, required: false, unique: false, minlength: 1 },
  email: { type: String, required: false, unique: false, minlength: 1 },
  phone: { type: String, required: false, unique: false, minlength: 3 },
  postCode: { type: String, required: false, unique: false, minlength: 3 },
  documentType: { type: String, required: false, unique: false, minlength: 3 },
  documentNumber: {
    type: String,
    required: false,
    unique: false,
    minlength: 3,
  },
  surname: { type: String, required: false, unique: false, minlength: 3 },
  movement: { type: mongoose.Schema.Types.ObjectId, ref: "Movement" },
});
export default mongoose.model("Client", schema);
