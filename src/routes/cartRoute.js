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
router.get("/togglePreferredAddress/:id", cartController.togglePreferredAddress);
router.get("/useCards", cartController.useCards);
router.get ("/removeCard/:id", cartController.removeCard);

router.get("/plus/:id", cartController.plus);
router.get("/minus/:id", cartController.minus);
router.get("/removeFromCart/:id", cartController.removeFromCart);

router.post("/addToCart", cartController.addToCart);
router.post("/frete", cartController.frete);
router.post("/confirmCardValue", cartController.confirmCardValue);

module.exports = router;