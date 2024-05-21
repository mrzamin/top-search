const Owner = require("../models/owner");
const asyncHandler = require("express-async-handler");

// Display list of all Owners.
exports.owner_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner list");
});

// Display detail page for a specific Owner.
exports.owner_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Owner detail: ${req.params.id}`);
});

// Display Owner create form on GET.
exports.owner_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner create GET");
});

// Handle Owner create on POST.
exports.owner_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner create POST");
});

// Display Owner delete form on GET.
exports.owner_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner delete GET");
});

// Handle Owner delete on POST.
exports.owner_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner delete POST");
});

// Display Owner update form on GET.
exports.owner_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner update GET");
});

// Handle Owner update on POST.
exports.owner_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner update POST");
});
