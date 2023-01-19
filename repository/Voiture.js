/* eslint-disable no-console */
var { Voiture } = require("../model/VoitureModel");
var ObjectID = require("mongoose").Types.ObjectId;

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
