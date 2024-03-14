const express = require('express')
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/cart", cartController.cartView);
router.get("/cartContinue", cartController.cartContinueView);
router.get("/cartCheckout", cartController.cartCheckoutView);
router.get("/finishPurchase", cartController.finishPurchase);

router.post("/addToCart", cartController.addToCart);

module.exports = router;