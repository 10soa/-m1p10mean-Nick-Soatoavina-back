/* eslint-disable no-console */
var Proformat = require("../repository/Proformat");

exports.getProforma = async (req, res) => {
  try {
    let posts = await Proformat.getProforma(req, res);
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
    .catch();
};

// retour demande proforma
exports.retour = async (req, res) => {
  Proformat.retour(req.body, res)
    .then((result) => res.status(200).json({ result }))
    .catch();
};

// liste des demandes de proforma

exports.liste = async (req, res) => {
  try {
    let posts = await Proformat.liste(req.query.page, req.query.pageNumber, res);
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {}
};

// proforma client

exports.proformaClient = async (req, res) => {
  try {
    let posts = await Proformat.proformaClient(req.params.client_id, res);
    console.log(req.params.client_id, posts);
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {}
};

//proforma client 1 
exports.listeProformatClient1=async(req,res)=>{
  try {
    let posts = await Proformat.proformaClient1(req.params.client_id,req.params.off,req.params.lim, res);
    //console.log(req.params.client_id, posts);
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {}
}

exports.countlisteProformatClient1=async(req,res)=>{
  try {
    let posts = await Proformat.countproformaClient1(req.params.client_id,res);
    //console.log(req.params.client_id, posts);
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {}
}