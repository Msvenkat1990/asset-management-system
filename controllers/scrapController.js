const { Asset, Transaction } = require("../models");

// Scrap Page
exports.scrapPage = async (req, res) => {
  const assets = await Asset.findAll({
    where: {
      status: {
        [require("sequelize").Op.ne]: "scrap",
      },
    },
  });

  res.render("scrapAsset", {
    assets,
  });
};

// Scrap Asset
exports.scrapAsset = async (req, res) => {
  try {
    await Asset.update(
      {
        status: "scrap",
      },
      {
        where: {
          id: req.body.assetId,
        },
      },
    );

    await Transaction.create({
      AssetId: req.body.assetId,

      action: "SCRAP",

      reason: req.body.reason,
    });

    req.session.message = "Asset scrapped successfully";

    res.redirect("/assets");
  } catch (error) {
    res.send(error.message);
  }
};
