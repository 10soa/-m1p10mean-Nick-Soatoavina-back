/* eslint-disable no-console */
var { Responsable } = require('../Model/ResponsableModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getResponsable = async (req, res) => {
  try {
    let data = await Responsable.find();
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
