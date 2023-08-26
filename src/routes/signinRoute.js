const express = require('express')
const router = express.Router();

const signinView = require("../controllers/signinController");

router.get("/signin", signinView.signinView);

module.exports = router;