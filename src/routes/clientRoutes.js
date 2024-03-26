const express = require('express')
const router = express.Router();

const userController = require("../controllers/userController");

// GET ROUTES

router.get("/clients", userController.clientsView);
router.get("/client/:id", userController.clientView);

router.get("/signin", userController.signinView);

router.get("/client/editClient/:id", userController.editClientView);
router.get("/client/deleteClient/:id", userController.deleteClient);

router.get("/client/editPhone/:id", userController.editPhoneView);
router.get("/client/deletePhone/:id", userController.deletePhone);
router.get("/client/addPhone/:id", userController.addPhoneView);

router.get("/client/editAddress/:id", userController.editAddressView);
router.get("/client/deleteAddress/:id", userController.deleteAddress);
router.get("/client/addAddress/:id", userController.addAddressView);


// POST ROUTES

router.post("/signin/newClient", userController.createClient);

router.post("/editClient", userController.updateClient);

router.post("/editAddress", userController.updateAddress);
router.post("/addAddress", userController.createAddress);

router.post("/editPhone", userController.updatePhone);
router.post("/addPhone", userController.createPhone);


module.exports = router;