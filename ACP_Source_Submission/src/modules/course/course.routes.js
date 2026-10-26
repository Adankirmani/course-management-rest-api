
const express = require("express");
const router = express.Router();

const controller = require("./course.controller");
const protect = require("../../middleware/auth.middleware");

router.use(protect);

router.post("/", controller.createCourse);
router.get("/", controller.getCourses);
router.get("/:id", controller.getCourse);
router.put("/:id", controller.updateCourse);
router.delete("/:id", controller.deleteCourse);

module.exports = router;
