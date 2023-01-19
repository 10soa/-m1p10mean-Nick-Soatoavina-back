/* eslint-disable no-console */
var Responsable = require("../repository/Responsable");
var ObjectID = require("mongoose").Types.ObjectId;

exports.getResponsables = async (req, res) => {
  try {
    let data = await Responsable.getResponsable(req, res);
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {}
};

// login responsable

exports.login = async (req, res) => {
  try {
    const data = await Responsable.login(req.body, res);
    res.status(200).json({
      status: 200,
      data: { responsable: data, typeUser: data.type },
    });
  } catch (err) {}
};
