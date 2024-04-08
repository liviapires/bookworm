const express = require('express')
const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/cart", cartController.cartView);
router.get("/cartContinue", cartController.cartContinueView);
router.get("/cartCheckout", cartController.cartCheckoutView);
router.get("/finishPurchase", cartController.finishPurchase);
router.get("/emptyCart", cartController.emptyCart);
router.get("/removeFromCart", cartController.removeFromCart);

router.get("/togglePreferredCard/:id", cartController.togglePreferredCard);

router.post("/addToCart", cartController.addToCart);
router.post("/frete", cartController.frete);

module.exports = router;