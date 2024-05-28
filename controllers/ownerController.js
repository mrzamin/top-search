const Owner = require("../models/owner");
const ResourceDetail = require("../models/resourceDetail");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Owners.
exports.owner_list = asyncHandler(async (req, res, next) => {
  const allOwners = await Owner.find().sort({ owner: 1 }).exec();
  res.render("owner_list", {
    title: "All Authors",
    owner_list: allOwners,
  });
});


// Display detail page for a specific Owner.
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

// Display Owner create form on GET.
exports.owner_create_get = asyncHandler(async (req, res, next) => {
  res.render("owner_form", { title: "Create Author" });
});

// Handle Owner create on POST.
exports.owner_create_post = [
  // Validate and sanitize the name field.
  body("owner", "Author cannot be more than 50 characters")
    .trim()
    .isLength({ max: 50 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const owner = new Owner({ owner: req.body.owner });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
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

// Display Owner delete form on GET.
exports.owner_delete_get = asyncHandler(async (req, res, next) => {
  const [owner, allResourcesByOwner] = await Promise.all([
    Owner.findById(req.params.id).exec(),
    ResourceDetail.find({ owner: req.params.id }, "name").exec(),
  ]);

  if (owner === null) {
    // No results.
    res.redirect("/database/authors");
  }

  res.render("owner_delete", {
    title: "Delete Author",
    owner: owner,
    owner_resources: allResourcesByOwner,
  });
});

// Handle Owner delete on POST.
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

// Display Owner update form on GET.
exports.owner_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner update GET");
});

// Handle Owner update on POST.
exports.owner_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Owner update POST");
});
