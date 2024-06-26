const express = require('express')
const router = express.Router();

const bookView = require("../controllers/bookController");

router.get("/book/:id", bookView.oneBookView);

module.exports = router;