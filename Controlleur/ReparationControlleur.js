/* eslint-disable no-console */
var { Reparation } = require('../Model/ReparationModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getReparation = async (req, res) => {
  try {
    let data = await Reparation.find();
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
