/* eslint-disable no-console */
var { Paiement } = require('../Model/PaiementModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getPaiement = async (res) => {
  try {
    let data = await Paiement.find();
    return data
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.createPaiement = async (montant,res) => {
  try {
    let data = await Paiement.create({"date_paiement" : new Date(Date.now()),"montant" : montant});
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};
