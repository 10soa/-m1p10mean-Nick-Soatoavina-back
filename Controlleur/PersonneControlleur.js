/* eslint-disable no-console */
var { Personne } = require('../Model/PersonneModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.getPersonne = async (req, res) => {
  try {
    let posts = await Personne.aggregate([
      {
        $lookup: {
          from : "Poste",
          localField : "nom",
          foreignField : "idPersonne",
          as : "poste"
        } 
      }
    ])
    res.status(200).json({
      status: 200,
      data: posts[2].poste,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
