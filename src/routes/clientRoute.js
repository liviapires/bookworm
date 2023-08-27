const express = require('express')
const router = express.Router();

const signinView = require("../controllers/clientController");

const clientController = require("../controllers/clientController");

router.get("/signin", signinView.signinView);

router.get("/clients", clientController.clientController.getAll);

module.exports = router;