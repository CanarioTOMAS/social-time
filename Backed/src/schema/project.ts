import mongoose from "mongoose";
//import mongoose from "mongoose";

export interface IProjectDB{
  name: string,
  description:string,
  clientIdDB:string,
  activityIdDB:string,
  businessIdDB: string,
  userIdDB:string
}

const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "ClientIdDB" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  deleted: { type: Boolean, required: false, unique: false },
  description: { type: String, required: true, unique: false, minlength: 2 },
  activityIdDB: [{ type: mongoose.Schema.Types.ObjectId, ref: "ActivityIdDB" }],
  businessIdDB: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusinessIdDB" }],
  userIdDB:[{ type: mongoose.Schema.Types.ObjectId, ref: "UserDB" }],

});
export default mongoose.model("ProjectDB", schema);
