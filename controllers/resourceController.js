const ResourceDetail = require("../models/resourceDetail");
const ResourceType = require("../models/resourceType");
const Author = require("../models/author");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

/* Homepage GET */
exports.index = asyncHandler(async (req, res, next) => {
  let [allTags, numResources, allTypes, numAuthors] = await Promise.all([
    ResourceDetail.collection.distinct("tags"),
    ResourceDetail.countDocuments().exec(),
    ResourceDetail.collection.distinct("types"),
    Author.countDocuments().exec(),
  ]);

  const numTags = allTags.toString().split(",").length;
  const numTypes = allTypes.toString().split(",").length;

  res.render("index", {
    resource_count: numResources,
    type_count: numTypes,
    author_count: numAuthors,
    tag_count: numTags,
    user: req.user,
  });
});

/* Resource List View page GET */
exports.resource_list = asyncHandler(async (req, res, next) => {
  const allResources = await ResourceDetail.find({})
    .populate("author")
    .populate("tags")
    .populate("types")
    .sort("name")
    .exec();
  res.render("resource_list", {
    title: "All Resources",
    resource_list: allResources,
  });
});

/* Resource Detail View page GET */
exports.resource_detail = asyncHandler(async (req, res, next) => {
  const resource = await ResourceDetail.findById(req.params.id)
    .populate("author")
    .populate("tags")
    .populate("types")
    .exec();
  if (resource === null) {
    const err = new Error("Resource not found");
    err.status = 404;
    return next(err);
  }
  const tags = resource.tags.toString().split(",").join(", ");
  const types = resource.types.toString().split(",").join(", ");
  res.render("resource_detail", {
    resource: resource,
    tags: tags,
    types: types,
  });
});

/* Node Detail View page GET */
exports.node_detail = asyncHandler(async (req, res, next) => {
  const nodeId = await Subject.findOne({ name: "Node" }).exec();
  const allResourcesByNode = await ResourceDetail.find(
    { subject: nodeId },
    "name"
  ).exec();
  if (allResourcesByNode === null) {
    const err = new Error("No Node Resources");
    err.status = 404;
    return next(err);
  }
  res.render("node_detail", {
    node_resources: allResourcesByNode,
  });
});

/* User Register form POST */
exports.react_detail = asyncHandler(async (req, res, next) => {
  const reactId = await Subject.findOne({ subject: "React" }).exec();
  const allResourcesByReact = await ResourceDetail.find(
    { subject: reactId },
    "name"
  ).exec();
  if (allResourcesByReact === null) {
    const err = new Error("No React Resources");
    err.status = 404;
    return next(err);
  }
  res.render("react_detail", {
    react_resources: allResourcesByReact,
  });
});

/* JavaScript Detail View page GET */
exports.javascript_detail = asyncHandler(async (req, res, next) => {
  const javascriptId = await Subject.findOne({ subject: "Javascript" }).exec();
  const allResourcesByJavascript = await ResourceDetail.find(
    { subject: javascriptId },
    "name"
  ).exec();
  if (allResourcesByJavascript === null) {
    const err = new Error("No Javascript Resources");
    err.status = 404;
    return next(err);
  }
  res.render("javascript_detail", {
    javascript_resources: allResourcesByJavascript,
  });
});

/* Advanced HTML & CSS Detail View page GET */
exports.advanced_detail = asyncHandler(async (req, res, next) => {
  const advancedId = await Subject.findOne({
    subject: "Advanced HTML & CSS",
  }).exec();
  const allResourcesByAdvanced = await ResourceDetail.find(
    { subject: advancedId },
    "name"
  ).exec();
  if (allResourcesByAdvanced === null) {
    const err = new Error("No Advanced HTML & CSS Resources");
    err.status = 404;
    return next(err);
  }
  res.render("advanced_detail", {
    advanced_resources: allResourcesByAdvanced,
  });
});

/* Intermediate HTML & CSS Detail View page GET */
exports.intermediate_detail = asyncHandler(async (req, res, next) => {
  const intermediateId = await Subject.findOne({
    subject: "Intermediate HTML & CSS",
  }).exec();

  const allResourcesByIntermediate = await ResourceDetail.find(
    { subject: intermediateId },
    "name"
  ).exec();
  if (allResourcesByIntermediate === null) {
    const err = new Error("No Intermediate HTML & CSS Resources");
    err.status = 404;
    return next(err);
  }
  res.render("intermediate_detail", {
    intermediate_resources: allResourcesByIntermediate,
  });
});

/* Create Resource form GET */
exports.resource_create_get = asyncHandler(async (req, res, next) => {
  const [allTags, allTypes, allAuthors] = await Promise.all([
    ResourceDetail.collection.distinct("tags"),
    ResourceDetail.collection.distinct("types"),
    Author.find().sort({ name: 1 }).exec(),
  ]);

  const tagArray = allTags.toString().split(",");
  const typeArray = allTypes.toString().split(",");

  res.render("resource_form", {
    title: "Create Resource",
    authors: allAuthors,
    types: typeArray,
    tags: tagArray,
  });
});

/* Create Resource form POST */
exports.resource_create_post = [
  body("name", "Resource name must be between 3-100 characters.")
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ max: 50 })
    .escape(),
  body("tags", "Tags must not be empty.").trim().isLength({ max: 50 }).escape(),
  body("types", "Type must not be empty.")
    .trim()
    .isLength({ max: 530, min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const tags = req.body.tags.toString().split(",");
    const types = req.body.types.toString().split(",");

    const errors = validationResult(req);

    const resource = new ResourceDetail({
      name: req.body.name,
      author: req.body.author,
      types: types,
      tags: tags,
      href: req.body.link,
    });

    if (!errors.isEmpty()) {
      const [allTags, allTypes, allAuthors] = await Promise.all([
        ResourceDetail.collection.distinct("tags"),
        ResourceDetail.collection.distinct("types"),
        Author.find().sort({ name: 1 }).exec(),
      ]);

      res.render("resource_form", {
        title: "Create Resource",
        authors: allAuthors,
        types: allTypes,
        resource: resource,
        tags: allTags,
        errors: errors.array(),
      });
    } else {
      await resource.save();
      res.redirect(resource.url);
    }
  }),
];

/* Delete Resource form GET */
exports.resource_delete_get = asyncHandler(async (req, res, next) => {
  const resource = await ResourceDetail.findById(req.params.id).exec();
  if (resource === null) {
    res.redirect("/database/resources");
  }
  res.render("resource_delete", {
    title: "Delete Resource",
    resource: resource,
  });
});

/* Delete Resource form POST */
exports.resource_delete_post = asyncHandler(async (req, res, next) => {
  await ResourceDetail.findByIdAndDelete(req.body.resourceid);
  res.redirect("/database/resources");
});

// Not yet implemented or required:
exports.gettinghired_detail = asyncHandler(async (req, res, next) => {});

exports.foundations_detail = asyncHandler(async (req, res, next) => {});

exports.resource_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource update GET");
});

exports.resource_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Resource update POST");
});
