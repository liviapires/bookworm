const express = require('express')
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/evaluateExchange", adminController.evaluateExchangeView);
router.get("/evaluateExchangeContinue", adminController.evaluateExchangeContinueView);
router.get("/evaluateDevolution", adminController.evaluateDevoutionView);
router.get("/evaluateDevolutionContinue", adminController.evaluateDevolutionContinueView);

router.get("/admin", adminController.mainAdminView);
router.get("/sales", adminController.salesView);

module.exports = router;