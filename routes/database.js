const express = require("express");
const router = express.Router();

const course_controller = require("../controllers/courseController");
const owner_controller = require("../controllers/ownerController");
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

/// OWNER ROUTES ///

router.get("/author/create", owner_controller.owner_create_get);

router.post("/author/create", owner_controller.owner_create_post);

router.get("/author/:id/delete", owner_controller.owner_delete_get);

router.post("/author/:id/delete", owner_controller.owner_delete_post);

router.get("/owner/:id/update", owner_controller.owner_update_get);

router.post("/owner/:id/update", owner_controller.owner_update_post);

router.get("/author/:id", owner_controller.owner_detail);

router.get("/authors", owner_controller.owner_list);

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

router.get("/course/create", course_controller.course_create_get);

router.post("/course/create", course_controller.course_create_post);

router.get("/course/:id/delete", course_controller.course_delete_get);

router.post("/course/:id/delete", course_controller.course_delete_post);

router.get("/course/:id/update", course_controller.course_update_get);

router.post("/course/:id/update", course_controller.course_update_post);

router.get("/course/:id", course_controller.course_detail);

router.get("/courses", course_controller.course_list);

module.exports = router;
