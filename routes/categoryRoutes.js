const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

// View Categories
router.get("/categories", categoryController.getCategories);

// Add Category
router.get("/categories/add", categoryController.addCategoryPage);

router.post("/categories/add", categoryController.createCategory);

// Edit Category
router.get("/categories/edit/:id", categoryController.editCategoryPage);

router.post("/categories/update/:id", categoryController.updateCategory);

// Delete Category
router.get("/categories/delete/:id", categoryController.deleteCategory);

module.exports = router;
