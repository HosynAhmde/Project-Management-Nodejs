const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true, required: true },
    role: { type: [String], default: ["USER"] },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [String], default: [] },
    token: { type: String, default: "" },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
