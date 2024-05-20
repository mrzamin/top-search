const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  owner: { type: String, required: true, maxLength: 50 },
});

OwnerSchema.virtual("url").get(function () {
  return `/database/owner/${this._id}`;
});

module.exports = mongoose.model("Owner", OwnerSchema);
