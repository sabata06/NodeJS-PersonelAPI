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

//!login/logout middlewares
// app.use(async (req, res, next) => {
//   const Personnel = require("./src/models/personnel.model");

//   req.isLogin = false;

//   if (req.session?.id) {
//     const user = await Personnel.findOne({ _id: req.session.id });
//     req.isLogin = user.password == req.session.password;
//   }

//   next();
// });
//**----------------------------------------------------------------- */
app.use(async (req, res, next) => {
  
},

/**----------------------------------------------------------------- */



//Routes:
//Home Path
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONEL API",
    session: req.session,
    isLogin: req.isLogin,
  });
})

//Auth
app.use("/auth", require("./src/routes/auth.router"));
//departmentS
app.use("/departments", require("./src/routes/department.router"));

//personnels
app.use("/personnels", require("./src/routes/personnel.router"));

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
// require("./src/helpers/sync")();
