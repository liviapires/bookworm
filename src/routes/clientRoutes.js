const express = require('express')
const router = express.Router();

const clientController = require("../controllers/clientController");

// GET ROUTES

router.get("/admin/clients", clientController.clientsView);

router.get("/admin/client/:id", clientController.clientView);

router.get("/myAccount/:id", clientController.clientView);

router.get("/signin", clientController.signinView);

router.get("/clients/delete/:id", clientController.deleteClient);

router.get("/clients/edit/:id", clientController.editClientView);


// POST ROUTES

router.post("/signin/newClient", clientController.createClient);

router.post("/editClient", clientController.updateClient);

module.exports = router;