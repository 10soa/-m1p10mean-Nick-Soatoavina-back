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
    var unwind = { $unwind: "$reparation" };
    var match = {
      $match: {
        marque: marque,
        modele: modele,
        numero: numero,
        type_voiture: type_voiture,
        client_id: Number(client_id),
        "reparation.date_recuperation": null,
      },
    };
    let data = await Voiture.aggregate([unwind, match]);
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
  reparation,
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
  if (data.length !== 0) {
    return (
      "Vous n'avez pas encore récupérer la voiture :" +
      marque +
      " " +
      modele +
      " " +
      numero +
      "!"
    );
  } else {
    reparation.date_deposition = new Date(Date.now());
    reparation.date_reception = null;
    reparation.montant_paye = 0.0;
    reparation.liste_reparation.map((el, index) => {
      reparation.liste_reparation[index].avancement = 0.0;
    });
    var newVoiture = await Voiture({
      marque: marque,
      modele: modele,
      numero: numero,
      type_voiture: type_voiture,
      client_id: client_id,
      reparation: reparation,
    });
    newVoiture.save(function (err) {
      if (err) throw err;
    });
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

/* liste des voiture deposées */
exports.listeVoitureDeposer = async (req, res) => {
  try {
    var unwind = { $unwind: "$reparation" };
    var match = { $match: { "reparation.date_reception": null } };
    var sort = { $sort: { "reparation.date_deposition": 1 } };
    let data = await Voiture.aggregate([unwind, match, sort]);
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
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

/* valider Reception voiture */
exports.receptionVoiture = async (id, date, res) => {
  try {
    let data = await Voiture.findOneAndUpdate(
      { _id: new ObjectID(id), "reparation.date_deposition": new Date(date) },
      {
        $set: {
          "reparation.$.date_reception": new Date(Date.now()),
        },
      },
      {
        new: true,
      }
    );
    return data;
  } catch (err) {}
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

// liste des voiture à valider le bon de sortie
exports.listeVoitureBD = async () => {
  const varUnwind = { $unwind: "$reparation" };
  const varMatch = {
    $match: {
      "reparation.bon_sortie": null,
      "reparation.date_recuperation": { $ne: null },
    },
  };
  const data = await Voiture.aggregate([varUnwind, varMatch]);
  return data;
};

// valider bon de sortie
exports.validationBD = async (
  client_id,
  numero,
  marque,
  modele,
  date_recuperation,
  date_deposition
) => {
  return await Voiture.findOneAndUpdate(
    {
      client_id: Number(client_id),
      marque: marque,
      modele: modele,
      numero: numero,
      "reparation.date_deposition": new Date(date_deposition),
      "reparation.date_recuperation": new Date(date_recuperation),
    },
    {
      $set: {
        "reparation.$.bon_sortie": new Date(Date.now()),
      },
    }
  );
};
