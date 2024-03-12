const express = require("express");
const ejs = require("ejs");

const app = express();
const path = require("path");

// The following line tells Express that we are using views as our view directory.
app.set("views", "./src/views");

// The following line tells Express that we are using EJS as our view engine.
app.set("view engine", "ejs");

// In the following line, we are telling Express to use the public folder to serve static files.
app.use(express.static(path.join(__dirname, "public")));

// The following lines requires the routes files from the routes folder.
const homeRouter = require("./src/routes/homeRoute");
const bookRouter = require("./src/routes/bookRoute");
const cartRouter = require("./src/routes/cartRoute");
const adminRouter = require("./src/routes/adminRoutes");
const ordersRouter = require("./src/routes/ordersRoute");
const signinRouter = require("./src/routes/signinRoute");
const myAccountRouter = require("./src/routes/myAccountRoutes");

const categoryRouter = require("./src/routes/categoryRoute");

app.use(homeRouter);
app.use(bookRouter);
app.use(cartRouter);
app.use(adminRouter);
app.use(ordersRouter);
app.use(signinRouter);
app.use(myAccountRouter);

app.get(categoryRouter);

app.get("/", (req, res) => {
    res.redirect("/home");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});