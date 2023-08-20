const express = require("express");
const app = express();

const homeRouter = require("./src/routes/homeRoute");

app.use(homeRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});