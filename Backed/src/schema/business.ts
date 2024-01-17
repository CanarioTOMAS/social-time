import mongoose, { ObjectId } from "mongoose";

export interface IBusinessDB {
  _id: string;
  userIdDB: string;
  name: string;
  address: string;
  category: string;
  email: string;
  image: string;
  phone: string;
  deleted: string;
  clientIdDB: string ;
}
const schema = new mongoose.Schema({
  userIdDB: { type: mongoose.Schema.Types.ObjectId, ref: "UserDB" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  address: { type: String, required: false, unique: false, minlength: 2 },
  category: { type: String, required: false, unique: false, minlength: 2 },
  email: { type: String, required: false, unique: false, minlength: 2 },
  image: { type: String, required: false, unique: false },
  phone: { type: String, required: false, unique: false, minlength: 2 },
  deleted: { type: Boolean, required: false, unique: false },
  clientIdDB: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClientDB" }],
});
export default mongoose.model("BusinessDB", schema);
