const express = require('express')
const router = express.Router();

const bookView = require("../controllers/bookController");

router.get("/book", bookView.bookView);

module.exports = router;