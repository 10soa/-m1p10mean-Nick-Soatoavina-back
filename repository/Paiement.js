/* eslint-disable no-console */
var { Paiement } = require("../Model/PaiementModel");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getPaiement = async (res) => {
  try {
    let data = await Paiement.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// revenu par mois
exports.revenuMois = async (année) => {
  const varMatchRevenu = {
    $match: {
      year: année,
    },
  };
  const varProjectRevenu = {
    $project: {
      year: { $year: "$date_paiement" },
      montant: 1,
      month: { $month: "$date_paiement" },
    },
  };
  const varGroupRevenu = {
    $group: {
      _id: "$month",
      revenu: {
        $sum: "$montant",
      },
    },
  };
  const revenu = await Paiement.aggregate([
    varProjectRevenu,
    varMatchRevenu,
    varGroupRevenu,
  ]);
  return revenu;
};
