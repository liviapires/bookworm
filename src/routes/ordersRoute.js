const express = require('express')
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.get("/order/:id", ordersController.orderView);
router.get("/doOrder/:id", ordersController.doOrderView);

module.exports = router;