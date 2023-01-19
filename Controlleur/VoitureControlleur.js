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

exports.insertionDepot = async (req,res) => {
  try{
    Voiture.depotVoiture(req.params.marque,req.params.modele,req.params.numero,req.params.type_voiture,req.params.client_id,req,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
};