const mongoose = require("mongoose");
const inviteRequest = new mongoose.Schema({
  teamID: { type: mongoose.Types.ObjectId, required: true },
  caller: { type: String, required: true },
  requestDate: { type: Date, default: Date.now() },
  status: { type: String, defualt: "pending" },
});
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
    inviteRequests: { type: [inviteRequest] },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
