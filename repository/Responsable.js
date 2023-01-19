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

exports.login = async (body, res) => {
  try {
    const data = await Responsable.findOne(body);
    if (data) {
      return { responsable: data, typeUser: data.type };
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
