const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResourceDetailSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  owner: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
  type: { type: Schema.Types.ObjectId, ref: "ResourceType", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  href: { type: String, required: true },
});

ResourceDetailSchema.virtual("url").get(function () {
  return `/database/resourcedetail/${this._id}`;
});

module.exports = mongoose.model("ResourceDetail", ResourceDetailSchema);
