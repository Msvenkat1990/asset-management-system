const { Category } = require("../models");

// View Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const message = req.session.message || null;
    delete req.session.message;
    res.render("categories", {
      categories,
      message,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Add Category Page
exports.addCategoryPage = (req, res) => {
  res.render("addCategory");
};

// Save Category
exports.createCategory = async (req, res) => {
  try {
    const lastCategory = await Category.findOne({
      order: [["id", "DESC"]],
    });
    let categoryId = "CAT001";
    if (lastCategory) {
      const lastNumber = parseInt(lastCategory.categoryId.replace("CAT", ""));
      categoryId = "CAT" + String(lastNumber + 1).padStart(3, "0");
    }

    await Category.create({
      categoryId,
      name: req.body.name,
    });
    req.session.message = "Category added successfully";
    res.redirect("/categories");
  } catch (error) {
    res.send(error.message);
  }
};

// Edit Category Page
exports.editCategoryPage = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.render("editCategory", {
      category,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    await Category.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    req.session.message = "Category updated successfully";
    res.redirect("/categories");
  } catch (error) {
    res.send(error.message);
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    req.session.message = "Category deleted successfully";
    res.redirect("/categories");
  } catch (error) {
    res.send(error.message);
  }
};
