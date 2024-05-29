const ResourceDetail = require("../models/resourceDetail");
const ResourceType = require("../models/resourceType");
const Owner = require("../models/owner");
const Course = require("../models/course");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

/* Homepage GET */
exports.index = asyncHandler(async (req, res, next) => {
  const [numResources, numTypes, numOwners, numCourses] = await Promise.all([
    ResourceDetail.countDocuments({}).exec(),
    ResourceType.countDocuments({}).exec(),
    Owner.countDocuments({}).exec(),
    Course.countDocuments({}).exec(),
  ]);
  res.render("index", {
    resource_count: numResources,
    type_count: numTypes,
    owner_count: numOwners,
    course_count: numCourses,
    user: req.user,
  });
});

/* Resource List View page GET */
exports.resource_list = asyncHandler(async (req, res, next) => {
  const allResources = await ResourceDetail.find({})
    .populate("owner")
    .populate("course")
    .sort({ course: 1, name: 1 })
    .exec();
  res.render("resource_list", {
    title: "All Resources",
    resource_list: allResources,
  });
});

/* Resource Detail View page GET */
exports.resource_detail = asyncHandler(async (req, res, next) => {
  const resource = await ResourceDetail.findById(req.params.id)
    .populate("owner")
    .populate("course")
    .populate("type")
    .exec();
  if (resource === null) {
    const err = new Error("Resource not found");
    err.status = 404;
    return next(err);
  }
  res.render("resource_detail", {
    resource: resource,
  });
});

/* Node Detail View page GET */
exports.node_detail = asyncHandler(async (req, res, next) => {
  const nodeId = await Course.findOne({ course: "Node" }).exec();
  const allResourcesByNode = await ResourceDetail.find(
    { course: nodeId },
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
  const reactId = await Course.findOne({ course: "React" }).exec();
  const allResourcesByReact = await ResourceDetail.find(
    { course: reactId },
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
  const javascriptId = await Course.findOne({ course: "Javascript" }).exec();
  const allResourcesByJavascript = await ResourceDetail.find(
    { course: javascriptId },
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
  const advancedId = await Course.findOne({
    course: "Advanced HTML & CSS",
  }).exec();
  const allResourcesByAdvanced = await ResourceDetail.find(
    { course: advancedId },
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
  const intermediateId = await Course.findOne({
    course: "Intermediate HTML & CSS",
  }).exec();

  const allResourcesByIntermediate = await ResourceDetail.find(
    { course: intermediateId },
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
  const [allCourses, allTypes, allAuthors] = await Promise.all([
    Course.find().sort({ course: 1 }).exec(),
    ResourceType.find().sort({ type: 1 }).exec(),
    Owner.find().sort({ owner: 1 }).exec(),
  ]);
  res.render("resource_form", {
    title: "Create Resource",
    authors: allAuthors,
    types: allTypes,
    courses: allCourses,
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
  body("course", "Course must not be empty.")
    .trim()
    .isLength({ max: 50 })
    .escape(),
  body("type", "Type must not be empty.")
    .trim()
    .isLength({ max: 530, min: 3 })
    .escape(),
  body("link", "Resource link must be a URL.").isURL().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const resource = new ResourceDetail({
      name: req.body.name,
      owner: req.body.author,
      type: req.body.type,
      course: req.body.course,
      href: req.body.link,
    });

    if (!errors.isEmpty()) {
      const [allCourses, allTypes, allAuthors] = await Promise.all([
        Course.find().sort({ course: 1 }).exec(),
        ResourceType.find().sort({ type: 1 }).exec(),
        Owner.find().sort({ owner: 1 }).exec(),
      ]);

      for (const type of allTypes) {
        if (resource.type === type._id) {
          type.checked = "true";
        }
      }
      res.render("resource_form", {
        title: "Create Resource",
        authors: allAuthors,
        types: allTypes,
        resource: resource,
        courses: allCourses,
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
