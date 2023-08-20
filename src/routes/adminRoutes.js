const express = require('express')
const router = express.Router();

const adminView = require("../controllers/adminController");

router.get("/evaluateExchange", adminView.evaluateExchangeView);

module.exports = router;