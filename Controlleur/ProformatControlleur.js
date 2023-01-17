/* eslint-disable no-console */
var { Proformat } = require('../Model/ProformatModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getProformat = async (req, res) => {
  try {
    let posts = await Proformat.find();
    res.status(200).json({
      status: 200,
      data: posts[0].reparation[0]
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
