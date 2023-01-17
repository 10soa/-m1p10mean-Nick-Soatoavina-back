/* eslint-disable no-console */
var { Reparation } = require('../Model/ReparationModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getReparations = async (req, res) => {
  try {
    let data = await Reparation.find();
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

exports.getReparation = async(req, res) => {
    Reparation.findOne({ reparation: req.params.reparation })
    .then(data => res.status(200).json({ data }))
    .catch((error) => res.status(404).json({msg: error}))
};

exports.createReparation = async (req, res) => {
    Reparation.create(req.body)
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({msg:  error }))
};

exports.updateReparation = async (req, res) => {
    Reparation.findOneAndUpdate({ reparation: req.params.reparation }, req.body, { new: true, runValidators: true })
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({msg: error }))
};

exports.deleteReparation = async (req, res) => {
    Reparation.findOneAndDelete({ reparation: req.params.reparation })
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({msg: error }))
};
