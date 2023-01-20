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

/* insertion depot voiture */
exports.insertionDepot = async (req,res) => {
  try{
    Voiture.depotVoiture(req.params.marque,req.params.modele,req.params.numero,req.params.type_voiture,req.params.client_id,req.body.reparation,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
};

/* Reception voiture */
exports.receptionVoiture= async (req,res) => {
  try{
    Voiture.receptionVoiture(req.body,res)
    .then((result) => res.status(200).json({ result }))
    .catch()
  }catch(err){
  }
}

/* Liste des voiture déposer */
exports.listeVoitureDeposer = async (req,res) => {
  try{
    Voiture.listeVoitureDeposer(res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
};

