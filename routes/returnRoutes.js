const express = require("express");

const router = express.Router();

const returnController = require("../controllers/returnController");

router.get("/return", returnController.returnPage);

router.post("/return", returnController.returnAsset);

module.exports = router;
