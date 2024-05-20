const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  course: { type: String, required: true, maxLength: 50, minLength: 3 },
});

CourseSchema.virtual("url").get(function () {
  return `/database/course/${this._id}`;
});

module.exports = mongoose.model("Course", CourseSchema);
