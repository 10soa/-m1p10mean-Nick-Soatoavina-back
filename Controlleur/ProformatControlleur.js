/* eslint-disable no-console */
var { Proformat } = require('../Model/ProformatModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getProforma = async (req, res) => {
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

exports.createProforma = async ( req, res) => {
  req.body.date_demande = new Date(Date.now());
  Proformat.create(req.body)
  .then(result => res.status(200).json({ result }))
  .catch((error) => res.status(500).json({msg:  error }))
}

exports.liste = async ( req, res) => {
  try {
    let posts = await Proformat.find({date_retour: null});
    res.status(200).json({
      status: 200,
      data: posts
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
}
