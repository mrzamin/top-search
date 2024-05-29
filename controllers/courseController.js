const Course = require("../models/course");
const ResourceDetail = require("../models/resourceDetail");
const asyncHandler = require("express-async-handler");

/* Delete Course GET */
exports.course_delete_get = asyncHandler(async (req, res) => {
  const [course, allResourcesByCourse] = await Promise.all([
    Course.findById(req.params.id).exec(),
    ResourceDetail.find({ course: req.params.id }, "name").exec(),
  ]);
  if (course === null) {
    res.redirect("/database");
  }
  res.render("course_delete", {
    title: "Delete Course",
    course: course,
    course_resources: allResourcesByCourse,
  });
});

/* Delete course POST */
exports.course_delete_post = asyncHandler(async (req, res) => {
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

/* Not yet implemented or not required */
exports.course_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: course list");
});

exports.course_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Course detail: ${req.params.id}`);
});

exports.course_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course create GET");
});

exports.course_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course create POST");
});

exports.course_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course update GET");
});

exports.course_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Course update POST");
});
