const express = require("express");
const router = express.Router();

const subject_controller = require("../controllers/subjectController");
const author_controller = require("../controllers/authorController");
const resource_controller = require("../controllers/resourceController");
const type_controller = require("../controllers/typeController");

/// RESOURCE ROUTES ///

router.get("/", resource_controller.index);

router.get("/resource/create", resource_controller.resource_create_get);

router.post("/resource/create", resource_controller.resource_create_post);

router.get("/resource/:id/delete", resource_controller.resource_delete_get);

router.post("/resource/:id/delete", resource_controller.resource_delete_post);

router.get("/resource/:id/update", resource_controller.resource_update_get);

router.post("/resource/:id/update", resource_controller.resource_update_post);

router.get("/resource/:id", resource_controller.resource_detail);

router.get("/resources/node", resource_controller.node_detail);

router.get("/resources/react", resource_controller.react_detail);

router.get("/resources/javascript", resource_controller.javascript_detail);

router.get(
  "/resources/advancedhtmlandcss",
  resource_controller.advanced_detail
);
router.get(
  "/resources/intermediatehtmlandcss",
  resource_controller.intermediate_detail
);
router.get("/resources", resource_controller.resource_list);

/// AUTHOR ROUTES ///

router.get("/author/create", author_controller.author_create_get);

router.post("/author/create", author_controller.author_create_post);

router.get("/author/:id/delete", author_controller.author_delete_get);

router.post("/author/:id/delete", author_controller.author_delete_post);

router.get("/owner/:id/update", author_controller.author_update_get);

router.post("/owner/:id/update", author_controller.author_update_post);

router.get("/author/:id", author_controller.author_detail);

router.get("/authors", author_controller.author_list);

/// TYPE ROUTES ///

router.get("/type/create", type_controller.type_create_get);

router.post("/type/create", type_controller.type_create_post);

router.get("/type/:id/delete", type_controller.type_delete_get);

router.post("/type/:id/delete", type_controller.type_delete_post);

router.get("/type/:id/update", type_controller.type_update_get);

router.post("/type/:id/update", type_controller.type_update_post);

router.get("/type/:id", type_controller.type_detail);

router.get("/types", type_controller.type_list);

/// COURSE ROUTES ///

router.get("/subject/create", subject_controller.subject_create_get);

router.post("/subject/create", subject_controller.subject_create_post);

router.get("/subject/:id/delete", subject_controller.subject_delete_get);

router.post("/subject/:id/delete", subject_controller.subject_delete_post);

router.get("/subject/:id/update", subject_controller.subject_update_get);

router.post("/subject/:id/update", subject_controller.subject_update_post);

router.get("/subject/:id", subject_controller.subject_detail);

router.get("/subjects", subject_controller.subject_list);

module.exports = router;
