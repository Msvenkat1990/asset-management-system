const { Asset, Employee, Transaction } = require("../models");

// Show Issue Page
exports.issuePage = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      where: {
        status: "stock",
      },
    });

    const employees = await Employee.findAll();

    res.render("issueAsset", {
      assets,

      employees,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// Issue Asset
exports.issueAsset = async (req, res) => {
  try {
    await Asset.update(
      {
        status: "issued",
      },
      {
        where: {
          id: req.body.assetId,
        },
      },
    );

    await Transaction.create({
      AssetId: req.body.assetId,

      EmployeeId: req.body.employeeId,

      action: "ISSUE",
    });

    req.session.message = "Asset issued successfully";

    res.redirect("/assets");
  } catch (error) {
    res.send(error.message);
  }
};
