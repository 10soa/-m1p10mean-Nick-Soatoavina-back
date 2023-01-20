/* eslint-disable no-console */
var { Voiture } = require("../model/VoitureModel");
var ObjectID = require("mongoose").Types.ObjectId;
var repositoryProformat = require("../repository/Proformat");

exports.getVoitures = async (res) => {
  try {
    let data = await Voiture.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

/* FindOne : voir si cette voiture est déjà dans la base de donné */
exports.getVoiture = async (
  marque,
  modele,
  numero,
  type_voiture,
  client_id,
  res
) => {
  try {
    let data = await Voiture.findOne({
      marque: marque,
      modele: modele,
      numero: numero,
      type_voiture: type_voiture,
      client_id: client_id,
    });
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

/* Dépôt voiture */
exports.depotVoiture = async (
  marque,
  modele,
  numero,
  type_voiture,
  client_id,
  req,
  res
) => {
  let data = await this.getVoiture(
    marque,
    modele,
    numero,
    type_voiture,
    client_id,
    res
  );
  if (!data) {
    var newVoiture = await Voiture({
      marque: req.body.marque,
      modele: req.body.modele,
      numero: req.body.numero,
      type_voiture: req.body.type_voiture,
      client_id: req.body.client_id,
      reparation: req.body.reparation,
    });
    newVoiture.save(function (err) {
      if (err) throw err;
    });
  } else {
    Voiture.findOneAndUpdate(
      {
        marque: marque,
        modele: modele,
        numero: numero,
        type_voiture: type_voiture,
        client_id: client_id,
      },
      {
        $addToSet: {
          reparation: req.body.reparation,
        },
      },
      function (err, b) {
        if (err) throw err;
      }
    );
  }
  repositoryProformat.deleteProformat(
    marque,
    modele,
    numero,
    type_voiture,
    client_id,
    res
  );
};

// facture reparation
exports.getFactureReparation = async (id, date_depot) => {
  const varUnwind = { $unwind: "$reparation" };
  const varMatch = {
    $match: {
      "reparation.date_deposition": new Date(date_depot),
      _id: ObjectID(id),
    },
  };
  const data = await Voiture.aggregate([varUnwind, varMatch]);
  return data;
};

// liste facture client
exports.getClientFactures = async (client_id, res) => {
  const varUnwind = { $unwind: "$reparation" };
  const varMatch = {
    $match: {
      client_id: Number(client_id),
    },
  };
  const data = await Voiture.aggregate([varUnwind, varMatch]);
  return data;
};

// paiement
exports.paiementClient = async (
  client_id,
  marque,
  numero,
  modele,
  date_depot,
  montant
) => {
  const varUnwind = { $unwind: "$reparation" };
  const varMatch = {
    $match: {
      client_id: Number(client_id),
      marque: marque,
      modele: modele,
      numero: numero,
      "reparation.date_deposition": new Date(date_depot),
    },
  };
  const varProject = { $project: { reparation: 1, _id: 0 } };
  const data1 = await Voiture.aggregate([varUnwind, varMatch, varProject]);
  const paiement = {
    montant: montant,
    date: new Date(Date.now()),
    validation: 0,
  };
  if (data1[0].reparation.paiement) {
    await Voiture.findOneAndUpdate(
      {
        client_id: Number(client_id),
        marque: marque,
        modele: modele,
        numero: numero,
        "reparation.date_deposition": new Date(date_depot),
      },
      {
        $push: {
          "reparation.$.paiement": paiement,
        },
      }
    );
    return paiement;
  } else {
    await Voiture.findOneAndUpdate(
      {
        client_id: Number(client_id),
        marque: marque,
        modele: modele,
        numero: numero,
        "reparation.date_deposition": new Date(date_depot),
      },
      {
        $set: {
          "reparation.$.paiement": [paiement],
        },
      }
    );
    return paiement;
  }
};
