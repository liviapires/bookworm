const express = require('express')
const router = express.Router();

const ordersView = require("../controllers/ordersController");

router.get("/orders", ordersView.ordersView);
router.get("/doOrder", ordersView.doOrderView);

module.exports = router;