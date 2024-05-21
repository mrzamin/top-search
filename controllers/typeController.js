const ResourceType = require("../models/resourceType");
const asyncHandler = require("express-async-handler");

// Display list of all Types.
exports.type_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type list");
});

// Display detail page for a specific Type.
exports.type_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Type detail: ${req.params.id}`);
});

// Display Type create form on GET.
exports.type_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type create GET");
});

// Handle Type create on POST.
exports.type_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type create POST");
});

// Display Type delete form on GET.
exports.type_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type delete GET");
});

// Handle Genre delete on POST.
exports.type_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type delete POST");
});

// Display Genre update form on GET.
exports.type_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update GET");
});

// Handle Genre update on POST.
exports.type_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update POST");
});
