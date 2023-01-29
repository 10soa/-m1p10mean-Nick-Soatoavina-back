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
  let revenuData = await Paiement.aggregate([
    varProjectRevenu,
    varMatchRevenu,
    varGroupRevenu,
  ]);
  const revenu = [];
  for (let i = 0; i < 12; i++) {
    if (revenuData.length === 0) {
      revenu[i] = {
        mois: i + 1,
        revenu: 0,
      };
    }
    for (let k = 0; k < revenuData.length; k++) {
      if (revenuData[k]._id === i + 1) {
        revenu[i] = {
          mois: i + 1,
          revenu: revenuData[k].revenu,
        };
        revenuData = revenuData.filter((rev) => rev._id !== i + 1);
        break;
      } else {
        if (k === revenuData.length - 1) {
          revenu[i] = {
            mois: i + 1,
            revenu: 0,
          };
        }
      }
    }
  }
  return revenu;
};

//  revenu par jour en un mois

exports.revenuJour = async (mois, année) => {
  const month = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  const varMatchRevenu = {
    $match: {
      year: année,
      month: mois + 1,
    },
  };
  
  const varProjectRevenu = {
    $project: {
      year: { $year: "$date_paiement" },
      montant: 1,
      month: { $month: "$date_paiement" },
      day: { $dayOfMonth: "$date_paiement" },
    },
  };
  const varGroupRevenu = {
    $group: {
      _id: "$day",
      revenu: {
        $sum: "$montant",
      },
    },
  };
  let revenuData = await Paiement.aggregate([
    varProjectRevenu,
    varMatchRevenu,
    varGroupRevenu,
  ]);
  const revenu = [];
  for (let i = 0; i < new Date(année, mois, 0).getDate(); i++) {
    if (revenuData.length === 0) {
      revenu[i] = {
        mois: i + 1 + " " + month[mois] + " " + année,
        revenu: 0,
      };
    }
    for (let k = 0; k < revenuData.length; k++) {
      if (revenuData[k]._id === i + 1) {
        revenu[i] = {
          mois: i + 1 + " " + month[mois] + " " + année,
          revenu: revenuData[k].revenu,
        };
        revenuData = revenuData.filter((rev) => rev._id !== i + 1);
        break;
      } else {
        if (k === revenuData.length - 1) {
          revenu[i] = {
            mois: i + 1 + " " + month[mois] + " " + année,
            revenu: 0,
          };
        }
      }
    }
  }
  return revenu;
};

exports.createPaiement = async (montant, res) => {
  try {
    let data = await Paiement.create({
      date_paiement: new Date(Date.now()),
      montant: montant,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};
