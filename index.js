const express = require("express");
const cors = require("cors");
require("colors");

// Create and allow to use env file
require("dotenv").config();

// DB Connection
require("./db")();

// init db
require("./db/init")();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
require("./routes")(app);

app.listen(port, () => { console.log(`Server running on port ${port}`.yellow.bold) });
