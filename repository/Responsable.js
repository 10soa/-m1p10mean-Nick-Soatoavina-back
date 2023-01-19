/* eslint-disable no-console */
var { Responsable } = require("../Model/ResponsableModel");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getResponsable = async (req, res) => {
  try {
    let data = await Responsable.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// login responsable

exports.login = async (username, mdp, res) => {
  try {
    const data = await Responsable.findOne({ nom: username, mdp: mdp });
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
