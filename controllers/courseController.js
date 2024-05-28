const Course = require("../models/course");
const ResourceDetail = require("../models/resourceDetail");
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
  const [course, allResourcesByCourse] = await Promise.all([
    Course.findById(req.params.id).exec(),
    ResourceDetail.find({ course: req.params.id }, "name").exec(),
  ]);

  if (course === null) {
    // No results.
    res.redirect("/database");
  }

  res.render("course_delete", {
    title: "Delete Course",
    course: course,
    course_resources: allResourcesByCourse,
  });
});

// Handle Course delete on POST.
exports.course_delete_post = asyncHandler(async (req, res, next) => {
  const [course, allResourcesByCourse] = await Promise.all([
    Course.findById(req.params.id).exec(),
    ResourceDetail.find({ course: req.params.id }, "name").exec(),
  ]);

  if (allResourcesByCourse.length > 0) {
    res.render("course_delete", {
      title: "Delete Course",
      course: course,
      course_resources: allResourcesByCourse,
    });
    return;
  } else {
    await Course.findByIdAndDelete(req.body.courseid);
    res.redirect("/database");
  }
});

// Display Course update form on GET.
exports.course_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course update GET");
});

// Handle Course update on POST.
exports.course_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course update POST");
});
