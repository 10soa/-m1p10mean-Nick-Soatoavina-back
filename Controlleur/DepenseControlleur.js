/* eslint-disable no-console */
var depenseRepository = require("../repository/Depense");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getDepenses = async (req, res) => {
  try {
    let data = await depenseRepository.getDepenses(req.query.page,req.query.pageNumber,res);
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};

exports.getDepense = async (req, res) => {
  depenseRepository
    .getDepense(req.params.depense_id)
    .then((data) => res.status(200).json({ data }))
    .catch();
};

exports.createDepense = async (req, res) => {
  depenseRepository
    .createDepense(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch();
};

exports.updateDepense = async (req, res) => {
  depenseRepository
    .updateDepense(req.params.depense_id, req.body,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
};

exports.deleteDepense = async (req, res) => {
  depenseRepository
    .deleteDepense(req.params.depense_id,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
};
