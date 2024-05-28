const ResourceType = require("../models/resourceType");
const ResourceDetail = require("../models/resourceDetail");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// Display list of all Types.
exports.type_list = asyncHandler(async (req, res, next) => {
  const allTypes = await ResourceType.find().sort({ type: 1 }).exec();
  res.render("type_list", {
    title: "All Resource Types",
    type_list: allTypes,
  });
});

// Display detail page for a specific Type.
exports.type_detail = asyncHandler(async (req, res, next) => {
  const [type, allResourcesByType] = await Promise.all([
    ResourceType.findById(req.params.id).exec(),
    ResourceDetail.find({ type: req.params.id }, "name").exec(),
  ]);

  if (type === null) {
    const err = new Error("Type not found");
    err.status = 404;
    return next(err);
  }

  res.render("type_detail", {
    type: type,
    type_resources: allResourcesByType,
  });
});

// Display Type create form on GET.
exports.type_create_get = asyncHandler(async (req, res, next) => {
  res.render("type_form", { title: "Create Type" });
});

// Handle Type create on POST.
exports.type_create_post = [
  // Validate and sanitize the name field.
  body("type", "Type must be between 3-30 characters")
    .trim()
    .isLength({ min: 3, max: 30 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const type = new ResourceType({ type: req.body.type });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("type_form", {
        title: "Create Type",
        type: type,
        errors: errors.array(),
      });
      return;
    } else {
      const typeExists = await ResourceType.findOne({ type: req.body.type })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (typeExists) {
        res.redirect(typeExists.url);
      } else {
        await type.save();
        res.redirect(type.url);
      }
    }
  }),
];

// Display Type delete form on GET.
exports.type_delete_get = asyncHandler(async (req, res, next) => {
  const [type, allResourcesByType] = await Promise.all([
    ResourceType.findById(req.params.id).exec(),
    ResourceDetail.find({ type: req.params.id }, "name").exec(),
  ]);

  if (type === null) {
    // No results.
    res.redirect("/database/types");
  }

  res.render("type_delete", {
    title: "Delete Type",
    type: type,
    type_resources: allResourcesByType,
  });
});

exports.type_delete_post = asyncHandler(async (req, res, next) => {
  const [type, allResourcesByType] = await Promise.all([
    ResourceType.findById(req.params.id).exec(),
    ResourceDetail.find({ type: req.params.id }, "name").exec(),
  ]);

  if (allResourcesByType.length > 0) {
    res.render("type_delete", {
      title: "Delete Type",
      type: type,
      type_resources: allResourcesByType,
    });
    return;
  } else {
    await ResourceType.findByIdAndDelete(req.body.typeid);
    res.redirect("/database/types");
  }
});

exports.type_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update GET");
});

exports.type_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update POST");
});
