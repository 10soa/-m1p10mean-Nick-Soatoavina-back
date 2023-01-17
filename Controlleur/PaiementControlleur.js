/* eslint-disable no-console */
var { Paiement } = require('../Model/PaiementModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getPaiement = async (req, res) => {
  try {
    let data = await Paiement.find();
    res.status(200).json({
      status: 200,
      data: data
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
