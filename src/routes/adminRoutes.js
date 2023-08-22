const express = require('express')
const router = express.Router();

const adminView = require("../controllers/adminController");

router.get("/evaluateExchange", adminView.evaluateExchangeView);
router.get("/evaluateExchange2", adminView.evaluateExchangeView2);

module.exports = router;