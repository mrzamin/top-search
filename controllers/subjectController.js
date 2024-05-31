const Subject = require("../models/subject");
const ResourceDetail = require("../models/resourceDetail");
const asyncHandler = require("express-async-handler");

/* Delete subject GET */
exports.subject_delete_get = asyncHandler(async (req, res) => {
  const [subject, allResourcesBySubject] = await Promise.all([
    Subject.findById(req.params.id).exec(),
    ResourceDetail.find({ subject: req.params.id }, "name").exec(),
  ]);
  if (subject === null) {
    res.redirect("/database");
  }
  res.render("subject_delete", {
    title: "Delete subject",
    subject: subject,
    subject_resources: allResourcesBySubject,
  });
});

/* Delete subject POST */
exports.subject_delete_post = asyncHandler(async (req, res) => {
  const [subject, allResourcesBySubject] = await Promise.all([
    Subject.findById(req.params.id).exec(),
    ResourceDetail.find({ subject: req.params.id }, "name").exec(),
  ]);
  if (allResourcesBySubject.length > 0) {
    res.render("subject_delete", {
      title: "Delete subject",
      subject: subject,
      subject_resources: allResourcesBySubject,
    });
    return;
  } else {
    await Subject.findByIdAndDelete(req.body.subjectid);
    res.redirect("/database");
  }
});

/* Not yet implemented or not required */
exports.subject_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject list");
});

exports.subject_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: subject detail: ${req.params.id}`);
});

exports.subject_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject create GET");
});

exports.subject_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject create POST");
});

exports.subject_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject update GET");
});

exports.subject_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: subject update POST");
});
