const express = require("express");

const router = express.Router();

const assetController = require("../controllers/assetController");

router.get("/assets", assetController.getAssets);

router.get("/assets/add", assetController.addAssetPage);

router.post("/assets/add", assetController.createAsset);

router.get("/assets/edit/:id", assetController.editAssetPage);

router.post("/assets/update/:id", assetController.updateAsset);

router.get("/assets/delete/:id", assetController.deleteAsset);

module.exports = router;
