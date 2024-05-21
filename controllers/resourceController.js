const ResourceDetail = require("../models/resourceDetail");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all Resources.
exports.resource_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource list");
});

// Display detail page for a specific Resource.
exports.resource_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Resource detail: ${req.params.id}`);
});

// Display Resource create form on GET.
exports.resource_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource create GET");
});

// Handle Resource create on POST.
exports.resource_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource create POST");
});

// Display Resource delete form on GET.
exports.resource_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource delete GET");
});

// Handle Resource delete on POST.
exports.resource_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource delete POST");
});

// Display Author update form on GET.
exports.resource_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource update GET");
});

// Handle Resource update on POST.
exports.resource_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource update POST");
});
