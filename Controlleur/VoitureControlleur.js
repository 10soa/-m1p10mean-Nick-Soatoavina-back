/* eslint-disable no-console */
var Voiture = require("../repository/Voiture");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getVoitures = async (req, res) => {
  try {
    let data = await Voiture.getVoitures();
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};
