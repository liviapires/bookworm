const express = require('express')
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.get("/order/:id", ordersController.orderView);
router.get("/doOrder/:id", ordersController.doOrderView);

router.get("/exchange/:id", ordersController.exchangeView);
router.get("/return/:id", ordersController.returnView);

router.get("/sendObjects/:saleId", ordersController.sendObjects);

router.post("/exchange", ordersController.exchange);

router.post("/setTransaction/:transactionType/:id", ordersController.setTransaction);

module.exports = router;