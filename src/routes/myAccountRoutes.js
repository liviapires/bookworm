const express = require('express')
const router = express.Router();

const myAccountController = require("../controllers/myAccountController");

router.get("/myAccount", myAccountController.myAccountView);
router.get("/addresses", myAccountController.addressesView);
router.get("/cards", myAccountController.cardsView);

module.exports = router;