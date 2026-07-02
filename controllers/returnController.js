const { Asset, Employee, Transaction } = require("../models");

// Return Page
exports.returnPage = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      where: {
        status: "issued",
      },

      include: {
        model: Transaction,

        include: Employee,
      },
    });

    res.render("returnAsset", {
      assets,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Return Asset
exports.returnAsset = async (req, res) => {
  try {
    await Asset.update(
      {
        status: "stock",
      },
      {
        where: {
          id: req.body.assetId,
        },
      },
    );

    const lastTransaction = await Transaction.findOne({
      where: {
        AssetId: req.body.assetId,
      },

      order: [["id", "DESC"]],
    });

    await Transaction.create({
      AssetId: req.body.assetId,

      EmployeeId: lastTransaction.EmployeeId,

      action: "RETURN",

      reason: req.body.reason,
    });

    req.session.message = "Asset returned successfully";

    res.redirect("/assets");
  } catch (error) {
    res.send(error.message);
  }
};
