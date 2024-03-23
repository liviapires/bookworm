const express = require('express')
const router = express.Router();

const userController = require("../controllers/userController");

// GET ROUTES

router.get("/admin/clients", userController.clientsView);
router.get("/admin/client/:id", userController.clientView);
router.get("/signin", userController.signinView);
router.get("/clients/delete/:id", userController.deleteClient);
router.get("/clients/edit/:id", userController.editClientView);
router.get("/client/edit/phone/:id", userController.editPhoneView);
router.get("/client/edit/address/:id", userController.editAddressView);


// POST ROUTES

router.post("/signin/newClient", userController.createClient);
router.post("/editClient", userController.updateClient);

module.exports = router;