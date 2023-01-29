/* eslint-disable no-console */
var ReparationRepository = require("../repository/Reparation");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getReparations = async (req, res) => {
  try {
    let data = await ReparationRepository.getReparations(req.params.off,req.params.lim,res);
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};

exports.countReparations = async (req, res) => {
  try {
    let data = await ReparationRepository.countReparations(res);
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};

exports.getReparation = async (req, res) => {
  ReparationRepository.getReparation(req.params.reparation_id,res)
    .then((data) => res.status(200).json({ data }))
    .catch();
};

exports.createReparation = async (req, res) => {
  ReparationRepository.createReparation(req.body,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
};

exports.updateReparation = async (req, res) => {
  ReparationRepository.updateReparation(req.params.reparation_id, req.body,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
};

exports.deleteReparation = async (req, res) => {
  ReparationRepository.deleteReparation(req.params.reparation_id,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
};

exports.reparationTypeVoiture =  async (req,res) => {
  ReparationRepository.reparationTypeVoiture(req.query.type)
  .then((result) => res.status(200).json({ result }))
  .catch();
}
