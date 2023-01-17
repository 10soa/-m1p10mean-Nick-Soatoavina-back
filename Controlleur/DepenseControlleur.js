/* eslint-disable no-console */
var { Depense } = require('../Model/DepenseModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getDepense = async (req, res) => {
  try {
    let data = await Depense.find();
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
