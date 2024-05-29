const ResourceType = require("../models/resourceType");
const ResourceDetail = require("../models/resourceDetail");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

/* Type List View page GET */
exports.type_list = asyncHandler(async (req, res, next) => {
  const allTypes = await ResourceType.find().sort({ type: 1 }).exec();
  res.render("type_list", {
    title: "All Resource Types",
    type_list: allTypes,
  });
});

/* Type Detail View page GET */
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

/* Create Type form GET */
exports.type_create_get = asyncHandler(async (req, res, next) => {
  res.render("type_form", { title: "Create Type" });
});

/* Create Type form POST */
exports.type_create_post = [
  body("type", "Type must be between 3-30 characters")
    .trim()
    .isLength({ min: 3, max: 30 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const type = new ResourceType({ type: req.body.type });

    if (!errors.isEmpty()) {
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

/* Delete Type form GET */
exports.type_delete_get = asyncHandler(async (req, res, next) => {
  const [type, allResourcesByType] = await Promise.all([
    ResourceType.findById(req.params.id).exec(),
    ResourceDetail.find({ type: req.params.id }, "name").exec(),
  ]);

  if (type === null) {
    res.redirect("/database/types");
  }

  res.render("type_delete", {
    title: "Delete Type",
    type: type,
    type_resources: allResourcesByType,
  });
});

/* Delete Type form POST */
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

/* Not yet implemented or not required. */
exports.type_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update GET");
});

exports.type_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Type update POST");
});
