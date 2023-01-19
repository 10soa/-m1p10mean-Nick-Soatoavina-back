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
