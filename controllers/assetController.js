const { Asset, Category } = require("../models");
const { Op } = require("sequelize");

// View Assets
exports.getAssets = async (req, res) => {
  try {
    const where = {};

    // Search by Make
    if (req.query.make) {
      where.make = {
        [Op.iLike]: `%${req.query.make}%`,
      };
    }

    // Search by Model
    if (req.query.model) {
      where.model = {
        [Op.iLike]: `%${req.query.model}%`,
      };
    }

    // Filter by Category
    if (req.query.categoryId) {
      where.CategoryId = req.query.categoryId;
    }

    const categories = await Category.findAll();

    const assets = await Asset.findAll({
      where,
      include: Category,
      order: [["id", "ASC"]],
    });

    const message = req.session.message || null;
    delete req.session.message;

    res.render("assets", {
      assets,
      categories,
      message,
      filters: req.query,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Show Add Asset Page
exports.addAssetPage = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.render("addAsset", {
      categories,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Save Asset
exports.createAsset = async (req, res) => {
  try {
    const category = await Category.findByPk(req.body.categoryId);

    if (!category) {
      return res.send("Category not found");
    }

    const prefix = category.name.substring(0, 3).toUpperCase();

    const lastAsset = await Asset.findOne({
      where: {
        CategoryId: req.body.categoryId,
      },
      order: [["id", "DESC"]],
    });

    let number = 1;

    if (lastAsset && lastAsset.assetId) {
      number = parseInt(lastAsset.assetId.substring(3)) + 1;
    }

    const assetId = prefix + String(number).padStart(3, "0");

    await Asset.create({
      assetId,
      serialNumber: req.body.serialNumber,
      make: req.body.make,
      model: req.body.model,
      value: req.body.value,
      CategoryId: req.body.categoryId,
    });

    req.session.message = "Asset added successfully";
    res.redirect("/assets");
  } catch (error) {
    res.send(error.message);
  }
};

// Edit Asset Page
exports.editAssetPage = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    const categories = await Category.findAll();

    res.render("editAsset", {
      asset,
      categories,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Update Asset
exports.updateAsset = async (req, res) => {
  try {
    await Asset.update(
      {
        serialNumber: req.body.serialNumber,
        make: req.body.make,
        model: req.body.model,
        value: req.body.value,
        CategoryId: req.body.categoryId,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    req.session.message = "Asset updated successfully";

    res.redirect("/assets");
  } catch (error) {
    res.send(error.message);
  }
};

// Delete Asset
exports.deleteAsset = async (req, res) => {
  try {
    await Asset.destroy({
      where: {
        id: req.params.id,
      },
    });

    req.session.message = "Asset deleted successfully";

    res.redirect("/assets");
  } catch (error) {
    res.send(error.message);
  }
};
