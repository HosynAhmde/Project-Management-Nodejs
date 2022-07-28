const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String },
    owner: { type: [mongoose.Types.ObjectId], required: true },
    team: { type: [mongoose.Types.ObjectId] },
    private: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const ProjectModel = mongoose.model("project", ProjectSchema);
module.exports = { ProjectModel };
