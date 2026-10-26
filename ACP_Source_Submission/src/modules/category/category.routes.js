
const express = require("express");
const router = express.Router();

const controller = require("./category.controller");
const protect = require("../../middleware/auth.middleware");

router.use(protect);

router.post("/", controller.createCategory);
router.get("/", controller.getCategories);
router.get("/:id", controller.getCategory);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
