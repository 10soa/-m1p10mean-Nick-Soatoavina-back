/* eslint-disable no-console */
var ReparationRepository = require("../repository/Reparation");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getReparations = async (req, res) => {
  try {
    let data = await ReparationRepository.getReparations();
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};

exports.getReparation = async (req, res) => {
  ReparationRepository.getReparation(req.params.reparation_id)
    .then((data) => res.status(200).json({ data }))
    .catch((error));
};

exports.createReparation = async (req, res) => {
  ReparationRepository.createReparation(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error));
};

exports.updateReparation = async (req, res) => {
  ReparationRepository.updateReparation(req.params.reparation_id, req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error));
};

exports.deleteReparation = async (req, res) => {
  ReparationRepository.deleteReparation(req.params.reparation_id)
    .then((result) => res.status(200).json({ result }))
    .catch((error));
};
