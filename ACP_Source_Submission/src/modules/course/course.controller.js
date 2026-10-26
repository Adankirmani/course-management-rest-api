
const mongoose = require("mongoose");
const Course = require("./course.model");
const Category = require("../category/category.model");

// CREATE COURSE
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;

    if (
      typeof title !== "string" || !title.trim() ||
      typeof description !== "string" || !description.trim() ||
      typeof price !== "number" || !Number.isFinite(price) ||
      price < 0 || !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid title, description, price and category are required"
      });
    }

    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL COURSES
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("category", "name");

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE COURSE
exports.getCourse = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const course = await Course.findById(req.params.id)
      .populate("category", "name");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE COURSE
exports.updateCourse = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;

    if (
      (title === undefined && description === undefined &&
        price === undefined && category === undefined) ||
      (title !== undefined &&
        (typeof title !== "string" || !title.trim())) ||
      (description !== undefined &&
        (typeof description !== "string" || !description.trim())) ||
      (price !== undefined &&
        (typeof price !== "number" || !Number.isFinite(price) || price < 0))
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide valid course fields"
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    if (category !== undefined) {
      if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID"
        });
      }

      const exists = await Category.findById(category);

      if (!exists) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (category !== undefined) updates.category = category;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// DELETE COURSE
exports.deleteCourse = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
