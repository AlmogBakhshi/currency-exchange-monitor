require("colors");

// Create and allow to use env file
require("dotenv").config();

// DB Connection
require("../db")();

// init db
require("../db/init")();

require("./producer").run();