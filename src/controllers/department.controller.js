"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department = require("../models/department.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Department);

    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await Department.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await Department.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Department.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      data,
      new: await Department.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Department.deleteOne({ _id: req.params.id });

    const statusCode = data.deletedCount > 0 ? 204 : 404;

    res.status(statusCode).send({
      error: false,
      data,
    });
  },
};
