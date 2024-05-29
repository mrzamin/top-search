const Owner = require("../models/owner");
const ResourceDetail = require("../models/resourceDetail");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

/* Author List View page */
exports.owner_list = asyncHandler(async (res) => {
  const allOwners = await Owner.find().sort({ owner: 1 }).exec();
  res.render("owner_list", {
    title: "All Authors",
    owner_list: allOwners,
  });
});

/* Author Detail View page */
exports.owner_detail = asyncHandler(async (req, res, next) => {
  const [owner, allResourcesByOwner] = await Promise.all([
    Owner.findById(req.params.id).exec(),
    ResourceDetail.find({ owner: req.params.id }, "name ").exec(),
  ]);
  if (owner === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }
  res.render("owner_detail", {
    owner: owner,
    owner_resources: allResourcesByOwner,
  });
});

/* Create Author form GET */
exports.owner_create_get = asyncHandler(async (req, res, next) => {
  res.render("owner_form", { title: "Create Author" });
});

/* Author Author form POST */
exports.owner_create_post = [
  body("owner", "Author cannot be more than 50 characters")
    .trim()
    .isLength({ max: 50 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const owner = new Owner({ owner: req.body.owner });
    if (!errors.isEmpty()) {
      res.render("owner_form", {
        title: "Create Author",
        owner: owner,
        errors: errors.array(),
      });
      return;
    } else {
      const ownerExists = await Owner.findOne({ type: req.body.owner })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (ownerExists) {
        res.redirect(ownerExists.url);
      } else {
        await owner.save();
        res.redirect(owner.url);
      }
    }
  }),
];

/* Delete Author page GET */
exports.owner_delete_get = asyncHandler(async (req, res, next) => {
  const [owner, allResourcesByOwner] = await Promise.all([
    Owner.findById(req.params.id).exec(),
    ResourceDetail.find({ owner: req.params.id }, "name").exec(),
  ]);

  if (owner === null) {
    res.redirect("/database/authors");
  }

  res.render("owner_delete", {
    title: "Delete Author",
    owner: owner,
    owner_resources: allResourcesByOwner,
  });
});

/* Delete Author page POST */
exports.owner_delete_post = asyncHandler(async (req, res, next) => {
  const [owner, allResourcesByOwner] = await Promise.all([
    Owner.findById(req.params.id).exec(),
    ResourceDetail.find({ owner: req.params.id }, "name").exec(),
  ]);

  if (allResourcesByOwner.length > 0) {
    res.render("owner_delete", {
      title: "Delete Author",
      owner: owner,
      owner_resources: allResourcesByOwner,
    });
    return;
  } else {
    await Owner.findByIdAndDelete(req.body.ownerid);
    res.redirect("/database/authors");
  }
});

/* Not yet implemented or not required. */
exports.owner_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner update GET");
});

exports.owner_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner update POST");
});
