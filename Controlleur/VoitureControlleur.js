/* eslint-disable no-console */
var { Voiture } = require('../Model/VoitureModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getVoitures = async (req, res) => {
  try {
    let data = await Voiture.find();
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
