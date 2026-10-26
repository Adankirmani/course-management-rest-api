
const mongoose = require("mongoose");
const Category = require("./category.model");

// CREATE
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof description !== "string" || !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required"
      });
    }

    const category = await Category.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE
exports.getCategory = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (
      (name === undefined && description === undefined) ||
      (name !== undefined &&
        (typeof name !== "string" || !name.trim())) ||
      (description !== undefined &&
        (typeof description !== "string" || !description.trim()))
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide valid category fields"
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
exports.deleteCategory = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
