const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [String], default: [] },
    image_profile: { type: String },
    token: { type: String, default: "" },
    role: { type: [String], default: ["USER"] },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
