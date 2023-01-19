/* eslint-disable no-console */
var Proformat = require("../repository/Proformat");

exports.getProforma = async (req, res) => {
  try {
    let posts = await Proformat.getProforma();
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {}
};

// demande proforma

exports.createProforma = async (req, res) => {
  Proformat.createProforma(req.body, res)
    .then((result) => res.status(200).json({ result }))
    .catch((error));
};

// retour demande proforma
exports.retour = async (req, res) => {
  Proformat.retour(req.body, res)
    .then((result) => res.status(200).json({ result }))
    .catch((error));
};

// liste des demandes de proforma

exports.liste = async (req, res) => {
  try {
    let posts = await Proformat.liste(res);
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {}
};
