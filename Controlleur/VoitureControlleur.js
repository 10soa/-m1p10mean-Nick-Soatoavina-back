/* eslint-disable no-console */
var Voiture = require("../repository/Voiture");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getVoitures = async (req, res) => {
  try {
    let data = await Voiture.getVoitures(res);
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};

exports.insertionDepot = async (req, res) => {
  try {
    Voiture.depotVoiture(
      req.params.marque,
      req.params.modele,
      req.params.numero,
      req.params.type_voiture,
      req.params.client_id,
      req,
      res
    )
      .then((result) => res.status(200).json({ result }))
      .catch();
  } catch (err) {}
};

exports.getFactureReparation = async (req, res) => {
  try {
    Voiture.getFactureReparation(req.params.id, req.query.date_deposition, res)
      .then((result) => res.status(200).json({ result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.getClientFacture = async (req, res) => {
  try {
    Voiture.getClientFactures(req.params.client_id, res)
      .then((result) => res.status(200).json({ factures: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.paiement = async (req, res) => {
  try {
    console.log("c", req.params.client_id,
    req.body.marque,
    req.body.numero,
    req.body.modele,
    req.body.date_deposition,
    req.body.montant,
    req.body.montant_paye)
    Voiture.paiementClient(
      req.params.client_id,
      req.body.marque,
      req.body.numero,
      req.body.modele,
      req.body.date_deposition,
      req.body.montant,
      req.body.montant_paye
    )
      .then((result) => res.status(200).json({ data: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};
