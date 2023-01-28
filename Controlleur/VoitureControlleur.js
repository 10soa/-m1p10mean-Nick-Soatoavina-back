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
    Voiture.getClientFactures(req.params.client_id,req.query.page, req.query.pageNumber,  res)
      .then((result) => res.status(200).json({ factures: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

/* insertion depot voiture */
exports.insertionDepot = async (req, res) => {
  try {
    Voiture.depotVoiture(
      req.params.marque,
      req.params.modele,
      req.params.numero,
      req.params.type_voiture,
      req.params.client_id,
      req.body.reparation,
      res
    )
      .then((result) => res.status(200).json({ result }))
      .catch();
  } catch (err) {}
};

/* Reception voiture */
exports.receptionVoiture = async (req, res) => {
  try {
    Voiture.receptionVoiture(req.params.id, req.params.dateDepos, res)
      .then((result) => res.status(200).json({ result: true }))
      .catch();
  } catch (err) {}
};

/* count Liste des voiture déposer */
exports.countlisteVoitureDeposer = async (req, res) => {
  try {
    Voiture.countlisteVoitureDeposer(res)
      .then((result) => res.status(200).json({ result }))
      .catch();
  } catch (err) {}
};

/* count Liste des voiture déposer */
exports.listeVoitureDeposer = async (req, res) => {
  try {
    Voiture.listeVoitureDeposer(req.params.off,req.params.lim,res)
      .then((result) => res.status(200).json({ result }))
      .catch();
  } catch (err) {}
};

exports.paiement = async (req, res) => {
  try {
    Voiture.paiementClient(
      req.params.client_id,
      req.body.marque,
      req.body.numero,
      req.body.modele,
      req.body.date_deposition,
      req.body.montant
    )
      .then((result) => res.status(200).json({ data: result }))
      .catch((error) => res.status(400).json({ status: 400, message: error.message} ));
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.listeVoitureBD = async (req, res) => {
  try {
    Voiture.listeVoitureBD(req.query.page,req.query.pageNumber)
      .then((result) => res.status(200).json({ data: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.validationBD = async (req, res) => {
  try {
    Voiture.validationBD(
      req.body.client_id,
      req.body.numero,
      req.body.marque,
      req.body.modele,
      req.body.date_recuperation,
      req.body.date_deposition
    )
      .then((result) => res.status(200).json({ data: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.reparationAvecAvancement = async (req, res) => {
  try {
    Voiture.reparationAvecAvancement(req, res)
      .then((result) => res.status(200).json({ result }))
      .catch();
  } catch (err) {}
};

exports.historiqueClient = async (req, res) => {
  try {
    Voiture.clientHistorique(req.params.client_id)
      .then((result) => res.status(200).json({ data: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.historiqueVoiture = async (req, res) => {
  try {
    Voiture.historiqueVoiture(
      req.query.marque,
      req.query.numero,
      req.query.modele,
      req.query.client_id,
      req.query.type_voiture
    )
      .then((result) => res.status(200).json({ data: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.tempsMoyenReparation = async (req, res) => {
  try {
    Voiture.tempsReparationMoyen()
      .then((result) => res.status(200).json({ duree: result }))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.benefice = async (req, res) => {
  try {
    Voiture.benefice(req.query)
      .then((result) => res.status(200).json(result))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

exports.chiffreAffaire = async (req, res) => {
  try {
    Voiture.chiffreAffaire(req.query.typeDonnee, req.query.donnee)
      .then((result) => res.status(200).json(result))
      .catch();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

/* count reparation avec avancement */
exports.countreparationAvecAvancement = async (req,res) => {
  try{
    Voiture.countreparationAvecAvancement(req,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
}

/* reparation avec avancement */
exports.reparationAvecAvancement = async (req,res) => {
  try{
    Voiture.reparationAvecAvancement(req.params.off,req.params.lim,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
}

/* Modification avancement reparation */
exports.modificationAvancement =async(req,res) =>{
  try{
    Voiture.modificationAvancement(req.params.marque,req.params.modele,req.params.numero,req.params.type_voiture,req.params.client_id,req.params.dateDepos,req.params.nomRep,req.params.avance,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
}

/* count Liste Paiement non valider */
exports.countlistePaiementNonValider =async(req,res) =>{
  try{
    Voiture.countlistePaiementNonValider(req,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
}

/* count Liste Paiement non valider */
exports.listePaiementNonValider =async(req,res) =>{
  try{
    Voiture.listePaiementNonValider(req.params.off,req.params.lim,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
}

/* Validation Paiement */
exports.validationPaiement =async(req,res) =>{
  try{
    Voiture.validationPaiement(req.body.marque,req.body.modele,req.body.numero,req.body.type_voiture,req.body.client_id,req.body.dateDepos,req.body.datePaye,req.body.paye,req.body.montantPaye,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
}

/* Recuperation voiture */
exports.recuperationVoiture = async (req,res) => {
  try{
    Voiture.recuperationVoiture(req.params.client_id,res)
    .then((result) => res.status(200).json({ result }))
    .catch();
  }catch(err){}
}

/* Validation reception voiture */
exports.validationRecuperationVoiture=async(req,res) => {
  Voiture.validationRecuperationVoiture(req.params.marque,req.params.modele,req.params.numero,req.params.type_voiture,req.params.client_id,req.params.montant,req.params.dateDepos,res)
  .then((result) => res.status(200).json({ result }))
  .catch();
};

/* count Liste bon de sortie */
exports.countListeBonSortie=async(req,res)=>{
  Voiture.countListeBonSortie(res)
  .then((result) => res.status(200).json({ result }))
  .catch();
}

/* Liste bon de sortie */
exports.listeBonSortie=async(req,res)=>{
  Voiture.listeBonSortie(req.params.off,req.params.lim,res)
  .then((result) => res.status(200).json({ result }))
  .catch();
}

/* Liste reparation voiture 1 + count */
exports.listeReparationVoiture1=async(req,res)=>{
  Voiture.listeReparationVoiture1(req,res)
  .then((result) => res.status(200).json({ result }))
  .catch();
}


