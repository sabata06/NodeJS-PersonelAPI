"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */

// envariables to process.env

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//asyncErrors to error handler
require("express-async-errors");
/* ------------------------------------------------------- */

//Configurations:

//connect to DB
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/**----------------------------------------------------------------- */

//Middlewares:

// Accept JSON
app.use(express.json());

//session Cookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

//res.getModelList()
app.use(require("./src/middlewares/findSearchSortPage"));

/**----------------------------------------------------------------- */

//Routes:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONEL API",
  });
});

//Home Path
/**----------------------------------------------------------------- */
/**----------------------------------------------------------------- */
/**----------------------------------------------------------------- */
/**----------------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
