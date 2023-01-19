/* eslint-disable no-console */
var Paiement = require("../repository/Paiement");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getPaiement = async (req, res) => {
  try {
    let data = await Paiement.getPaiement(res);
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};
