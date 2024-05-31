const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
});

AuthorSchema.virtual("url").get(function () {
  return `/database/author/${this._id}`;
});

AuthorSchema.index({ type: "text" });

module.exports = mongoose.model("Author", AuthorSchema);
