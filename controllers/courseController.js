const Course = require("../models/course");
const asyncHandler = require("express-async-handler");

// Display list of all Owners.
exports.course_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: course list");
});

// Display detail page for a specific Course.
exports.course_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Course detail: ${req.params.id}`);
});

// Display Course create form on GET.
exports.course_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course create GET");
});

// Handle Course create on POST.
exports.course_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course create POST");
});

// Display Course delete form on GET.
exports.course_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course delete GET");
});

// Handle Course delete on POST.
exports.course_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course delete POST");
});

// Display Course update form on GET.
exports.course_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course update GET");
});

// Handle Course update on POST.
exports.course_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course update POST");
});
