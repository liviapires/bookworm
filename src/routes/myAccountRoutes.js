const express = require('express')
const router = express.Router();

const myAccountView = require("../controllers/myAccountController");

router.get("/myAccount", myAccountView.myAccountView);
router.get("/addresses", myAccountView.addressesView);
router.get("/cards", myAccountView.cardsView);

module.exports = router;