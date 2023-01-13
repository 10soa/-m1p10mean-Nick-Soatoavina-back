/* eslint-disable no-console */
var { Personne } = require('../Model/PersonneModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getPersonne = async (req, res) => {
  try {
    let posts = await Personne.find();
    res.status(200).json({
      status: 200,
      data: posts.length,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
