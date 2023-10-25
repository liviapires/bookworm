const express = require('express')
const router = express.Router();

const cartView = require("../controllers/cartController");
const cartContinueView = require("../controllers/cartController");

router.get("/cart", cartView.cartView);
router.get("/cartContinue", cartContinueView.cartContinueView);

router.post("/addToCart", cartView.addToCart);

module.exports = router;