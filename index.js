const express = require("express");
const session = require("express-session");

const app = express();
const path = require("path");

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
}));

// The following line tells Express that we are using views as our view directory.
app.set("views", "./src/views");

// The following line tells Express that we are using EJS as our view engine.
app.set("view engine", "ejs");

// In the following line, we are telling Express to use the public folder to serve static files.
app.use(express.static(path.join(__dirname, "public")));

// The following line tells Express that we are using JSON to parse the incoming requests.
app.use(express.json());

// The following line tells Express that we are using URL encoded to parse the incoming requests.
app.use(express.urlencoded({ extended: true }));

// The following lines requires the routes files from the routes folder.
const homeRouter = require("./src/routes/homeRoute");
const bookRouter = require("./src/routes/bookRoute");
const cartRouter = require("./src/routes/cartRoute");
const adminRouter = require("./src/routes/adminRoutes");
const ordersRouter = require("./src/routes/ordersRoute");
const clientRouter = require("./src/routes/clientRoutes");
const myAccountRouter = require("./src/routes/myAccountRoutes");

const categoryRouter = require("./src/routes/categoryRoute");

app.use(homeRouter);
app.use(bookRouter);
app.use(cartRouter);
app.use(adminRouter);
app.use(ordersRouter);
app.use(clientRouter);
app.use(myAccountRouter);

app.use(categoryRouter);

// The following line tells Express to redirect the user to the home page if the user tries to access a route that does not exist.
app.get("/", (req, res) => {
    res.redirect("/home");
});

// The following line tells Express to listen to port 3000 for incoming requests.
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Database connection verification and sync
(async () => {
    const db = require("./config/db");
    
    db.authenticate()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log("Error: " + err));

    await db.sync();
})();