const express = require("express");
const router = express.Router();

// Require controller modules.
const course_controller = require("../controllers/courseController");
const owner_controller = require("../controllers/ownerController");
const resource_controller = require("../controllers/resourceController");
const type_controller = require("../controllers/typeController");

/// RESOURCE ROUTES ///

// GET database home page.
router.get("/", resource_controller.index);

// router.get("/searchauthor", owner_controller.search_get);

// router.post("/searchauthor", owner_controller.search_post);

// GET request for creating a Resource. NOTE This must come before routes that display Resource (uses id).
router.get("/resource/create", resource_controller.resource_create_get);

// POST request for creating Resource.
router.post("/resource/create", resource_controller.resource_create_post);

// GET request to delete Resource.
router.get("/resource/:id/delete", resource_controller.resource_delete_get);

// POST request to delete Resource.
router.post("/resource/:id/delete", resource_controller.resource_delete_post);

// GET request to update Resource.
router.get("/resource/:id/update", resource_controller.resource_update_get);

// POST request to update Resource.
router.post("/resource/:id/update", resource_controller.resource_update_post);

// GET request for one Resource.
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
// GET request for list of all Resource items.
router.get("/resources", resource_controller.resource_list);

/// OWNER ROUTES ///

// GET request for creating Owner. NOTE This must come before route for id (i.e. display owner).
router.get("/author/create", owner_controller.owner_create_get);

// POST request for creating Owner.
router.post("/author/create", owner_controller.owner_create_post);

// GET request to delete Owner.
router.get("/author/:id/delete", owner_controller.owner_delete_get);

// POST request to delete Owner.
router.post("/author/:id/delete", owner_controller.owner_delete_post);

// GET request to update Owner.
router.get("/owner/:id/update", owner_controller.owner_update_get);

// POST request to update Owner.
router.post("/owner/:id/update", owner_controller.owner_update_post);

// GET request for one Owner.
router.get("/author/:id", owner_controller.owner_detail);

// GET request for list of all Owners.
router.get("/authors", owner_controller.owner_list);

/// TYPE ROUTES ///

// GET request for creating a Type. NOTE This must come before route that displays Type (uses id).
router.get("/type/create", type_controller.type_create_get);

//POST request for creating Type.
router.post("/type/create", type_controller.type_create_post);

// GET request to delete Type.
router.get("/type/:id/delete", type_controller.type_delete_get);

// POST request to delete Type.
router.post("/type/:id/delete", type_controller.type_delete_post);

// GET request to update Type.
router.get("/type/:id/update", type_controller.type_update_get);

// POST request to update Type.
router.post("/type/:id/update", type_controller.type_update_post);

// GET request for one Type.
router.get("/type/:id", type_controller.type_detail);

// GET request for list of all Types.
router.get("/types", type_controller.type_list);

/// COURSE ROUTES ///

// GET request for creating a Course. NOTE This must come before route that displays Course (uses id).
router.get("/course/create", course_controller.course_create_get);

// POST request for creating Course.
router.post("/course/create", course_controller.course_create_post);

// GET request to delete Course.
router.get("/course/:id/delete", course_controller.course_delete_get);

// POST request to delete Course.
router.post("/course/:id/delete", course_controller.course_delete_post);

// GET request to update Course.
router.get("/course/:id/update", course_controller.course_update_get);

// POST request to update Course.
router.post("/course/:id/update", course_controller.course_update_post);

// GET request for one Course.
router.get("/course/:id", course_controller.course_detail);

// GET request for list of all Course.
router.get("/courses", course_controller.course_list);

module.exports = router;
