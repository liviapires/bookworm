const express = require('express')
const router = express.Router();

const cartView = require("../controllers/cartController");
const cartContinueView = require("../controllers/cartController");

router.get("/cart", cartView.cartView);
router.get("/cartContinue", cartContinueView.cartContinueView);

module.exports = router;