"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel.model");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      const user = await Personnel.findOne({ username, password });

      if (user) {
        if (user.isActive) {
          //login ok
          const accesData = {
            _id: user._id,
            departmentId: user.departmentId,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
            isLead: user.isLead,
          };
          const refreshData = {
            username: user.username,
            password: user.password,
          };
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please entery username and password.");
    }
  },
  refresh: async (req, res) => {},
  logout: async (req, res) => {},
};
