const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResourceDetailSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  type: { type: Schema.Types.ObjectId, ref: "ResourceType", required: true },
  subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  href: { type: String, required: true },
});

ResourceDetailSchema.virtual("url").get(function () {
  return `/database/resource/${this._id}`;
});

module.exports = mongoose.model("ResourceDetail", ResourceDetailSchema);
