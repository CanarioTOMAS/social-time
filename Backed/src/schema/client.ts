import mongoose from "mongoose";
//import mongoose from "mongoose";
export interface IClientDB{
  business: string,
  name: string,
  city: string,
  address: string,
  email: string,
  phone: string,
  postCode: string,
  documentType: string,
  documentNumber: string,
  surname:string,
  project: string,
  image: string,
}
const schema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  name: { type: String, required: true, unique: false, minlength: 2 },
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
  deleted: { type: Boolean, required: false, unique: false },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  image: { type: String, required: false, unique: false },
  //movement: { type: mongoose.Schema.Types.ObjectId, ref: "Movement" },
});
export default mongoose.model("ClientDB", schema);
