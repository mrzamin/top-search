const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: { type: String, required: true, maxLength: 50, minLength: 3 },
});

SubjectSchema.virtual("url").get(function () {
  return `/database/subject/${this._id}`;
});

module.exports = mongoose.model("Subject", SubjectSchema);
