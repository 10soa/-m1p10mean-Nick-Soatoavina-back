/* eslint-disable no-console */
var { Responsable } = require("../Model/ResponsableModel");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getResponsable = async (req, res) => {
  try {
    let data = await Responsable.find();
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await Responsable.findOne(req.body);
    if (data) {
      res.status(200).json({
        status: 200,
        data: { responsable: data, typeUser: data.type },
      });
    } else {
      res.status(400).json({
        status: 400,
        message: " Utilisateur inexistant",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
  // .then(data => res.status(200).json({ data }))
  // .catch((error) => res.status(404).json({msg: error}))
};
