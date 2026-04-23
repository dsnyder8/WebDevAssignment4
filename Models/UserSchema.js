import mongoose from "mongoose";
import { time, timeStamp } from "node:console";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
    user_name: {
    type: String,
    required: true,
    unique: true,
  },

    email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },

    password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, 

{timestamps: true});

export default mongoose.model("User", UserSchema);