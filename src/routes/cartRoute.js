const express = require('express')
const router = express.Router();

const cartView = require("../controllers/cartController");

router.get("/cart", cartView.cartView);

module.exports = router;