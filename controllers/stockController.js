const { Asset, Category } = require("../models");
const { Op } = require("sequelize");

exports.stockView = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      where: {
        status: "stock",
      },

      include: Category,
    });

    const totalAssets = assets.length;

    const totalValue = assets.reduce((sum, asset) => {
      return sum + Number(asset.value);
    }, 0);

    res.render("stockView", {
      assets,
      totalAssets,
      totalValue,
    });
  } catch (error) {
    res.send(error.message);
  }
};
