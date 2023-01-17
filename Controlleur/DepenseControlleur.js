/* eslint-disable no-console */
var { Depense } = require('../Model/DepenseModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getDepenses = async (req, res) => {
  try {
    let data = await Depense.find();
    res.status(200).json({
      status: 200,
      data: data
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.getDepense = async (req, res) => {
  Depense.findOne({ _id: req.params.depense_id })
  .then(data => res.status(200).json({ data }))
  .catch((error) => res.status(404).json({msg: error}))
};

exports.createDepense = async (req, res) => {
  Depense.create(req.body)
  .then(result => res.status(200).json({ result }))
  .catch((error) => res.status(500).json({msg:  error }))
};

exports.updateDepense = async (req, res) => {
  Depense.findOneAndUpdate({ _id: req.params.depense_id }, req.body, { new: true, runValidators: true })
  .then(result => res.status(200).json({ result }))
  .catch((error) => res.status(404).json({msg: error }))
};

exports.deleteDepense = async (req, res) => {
  Depense.findOneAndDelete({ _id: req.params.depense_id })
  .then(result => res.status(200).json({ result }))
  .catch((error) => res.status(404).json({msg: error }))
};