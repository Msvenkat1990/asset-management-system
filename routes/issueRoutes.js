const express = require("express");

const router = express.Router();

const issueController = require("../controllers/issueController");

router.get("/issue", issueController.issuePage);

router.post("/issue", issueController.issueAsset);

module.exports = router;
