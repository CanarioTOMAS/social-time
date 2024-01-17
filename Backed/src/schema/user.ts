import mongoose, { Types } from "mongoose";

export interface IUserDB {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  image: string;
  address: string;
  gender: string;
  phone: string;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  surname: { type: String, required: true, unique: false },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    validate: {
      validator: function (value: any) {
        // Expresión regular para validar el formato de correo electrónico
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "El campo de correo electrónico no es válido.",
    },
  },
  password: {
    type: String,
    required: true,
    unique: false,
    minlength: [6, "La contraseña debe tener al menos 6 caracteres."],
  },
  role: { type: String, required: false, unique: false },
  image: { type: String, required: false, unique: false },
  address: { type: String, required: false, unique: false },
  gender: { type: String, required: false, unique: false },
  phone: { type: String, required: false, unique: false },
  deleted: { type: Boolean, required: false, unique: false },
  businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }],
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activities" }],
});
export default mongoose.model<IUserDB>("UserDB", schema);
