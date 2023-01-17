/* eslint-disable no-console */
var { Client } = require('../Model/ClientModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getClient = async (req, res) => {
  try {
    let data = await Client.find();
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
