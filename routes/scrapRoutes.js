const express = require("express");

const router = express.Router();

const scrapController = require("../controllers/scrapController");

router.get("/scrap", scrapController.scrapPage);

router.post("/scrap", scrapController.scrapAsset);

module.exports = router;
