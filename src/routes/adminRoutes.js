const express = require('express')
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/evaluateExchanges", adminController.evaluateExchangesView);
router.get("/evaluateExchange/:id", adminController.evaluateExchangeView);

router.get("/:do/:type/:id", adminController.updateTransaction);

router.get("/evaluateDevolutions", adminController.evaluateDevolutions);
router.get("/evaluateDevolution/:id", adminController.evaluateDevoutionView);

router.get("/admin", adminController.mainAdminView);
router.get("/sales", adminController.salesView);
router.get("/sale/:id", adminController.saleView);

router.post("/updateSaleStatus", adminController.updateSaleStatus);

router.get("/chart", adminController.chart);
router.get("/filterData", adminController.filterData);

module.exports = router;