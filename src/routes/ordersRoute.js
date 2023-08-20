const express = require('express')
const router = express.Router();

const ordersView = require("../controllers/ordersController");

router.get("/orders", ordersView.ordersView);

module.exports = router;