const express = require('express')
const router = express.Router();

const clientController = require("../controllers/clientController");
const signinController = require("../controllers/signinController");

router.get("/signin", signinController.signinView);

router.get("/clients", clientController.getAllClients);

router.get("/client/:id", clientController.getClientById);

router.post("/add", clientController.createClient);

module.exports = router;