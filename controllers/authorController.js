const Author = require("../models/author");
const ResourceDetail = require("../models/resourceDetail");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

/* Author List View page */
exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ author: 1 }).exec();
  res.render("author_list", {
    title: "All Authors",
    author_list: allAuthors,
  });
});

/* Author Detail View page */
exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, allResourcesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    ResourceDetail.find({ author: req.params.id }, "name").exec(),
  ]);
  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }
  res.render("author_detail", {
    author: author,
    author_resources: allResourcesByAuthor,
  });
});

/* Create Author form GET */
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
});

/* Author Author form POST */
exports.author_create_post = [
  body("name", "Author cannot be more than 50 characters")
    .trim()
    .isLength({ max: 50 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const author = new Author({ name: req.body.name });
    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: author,
        errors: errors.array(),
      });
      return;
    } else {
      const authorExists = await Author.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (authorExists) {
        res.redirect(authorExists.url);
      } else {
        await author.save();
        res.redirect(author.url);
      }
    }
  }),
];

/* Delete Author page GET */
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  const [author, allResourcesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    ResourceDetail.find({ author: req.params.id }, "name").exec(),
  ]);

  if (author === null) {
    res.redirect("/database/authors");
  }

  res.render("author_delete", {
    title: "Delete Author",
    author: author,
    author_resources: allResourcesByAuthor,
  });
});

/* Delete Author page POST */
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  const [author, allResourcesByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    ResourceDetail.find({ author: req.params.id }, "name").exec(),
  ]);

  if (allResourcesByAuthor.length > 0) {
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_resources: allResourcesByAuthor,
    });
    return;
  } else {
    await Author.findByIdAndDelete(req.body.authorid);
    res.redirect("/database/authors");
  }
});

/* Not yet implemented or not required. */
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: author update GET");
});

exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: author update POST");
});
