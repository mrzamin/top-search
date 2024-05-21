const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResourceTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Article", "Documentation", "Video", "Audio"],
    default: "Article",
  },
});

ResourceTypeSchema.virtual("url").get(function () {
  return `/database/type/${this._id}`;
});

module.exports = mongoose.model("ResourceType", ResourceTypeSchema);
