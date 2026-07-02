const express = require("express");
const router = express.Router();

const historyController = require("../controllers/historyController");

router.get("/history/:id", historyController.assetHistory);

module.exports = router;
