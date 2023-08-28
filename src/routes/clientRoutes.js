const express = require('express')
const router = express.Router();

const clientController = require("../controllers/clientController");

router.get("/signin", clientController.signinView);

router.get("/clients", clientController.getAllClients);

// Create a new client
router.post("/signup", function (req, res) {
    clientController.create(req, res);
});

module.exports = router;