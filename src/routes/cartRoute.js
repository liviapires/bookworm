const express = require('express')
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/cart", cartController.cartView);
router.get("/cartContinue", cartController.cartContinueView);
router.get("/cartCheckout", cartController.cartCheckoutView);
router.get("/finishPurchase", cartController.finishPurchase);
router.get("/emptyCart", cartController.emptyCart);
router.get("/removeFromCart", cartController.removeFromCart);

router.post("/addToCart", cartController.addToCart);


module.exports = router;