const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResourceTypeSchema = new Schema({
  type: {
    type: [String],
    required: true,
    maxLength: 30,
    minLength: 3,
  },
});

ResourceTypeSchema.virtual("url").get(function () {
  return `/database/type/${this._id}`;
});

module.exports = mongoose.model("ResourceType", ResourceTypeSchema);
