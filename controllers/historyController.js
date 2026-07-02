const { Asset, Transaction, Employee } = require("../models");

exports.assetHistory = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    const history = await Transaction.findAll({
      where: {
        AssetId: req.params.id,
      },
      include: Employee,
      order: [["createdAt", "ASC"]],
    });

    res.render("assetHistory", {
      asset,
      history,
    });
  } catch (err) {
    res.send(err.message);
  }
};
