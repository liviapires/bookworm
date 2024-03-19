const express = require('express')
const router = express.Router();

const myAccountController = require("../controllers/myAccountController");

router.get("/myAccount", myAccountController.myAccountView);

module.exports = router;