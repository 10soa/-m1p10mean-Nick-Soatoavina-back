/* eslint-disable no-console */
var { Proformat } = require("../Model/ProformatModel");
var { Client } = require("../Model/ClientModel");
var ObjectID = require("mongoose").Types.ObjectId;
var nodemailer = require("nodemailer");

exports.getProforma = async (req, res) => {
  try {
    let posts = await Proformat.find();
    res.status(200).json({
      status: 200,
      data: posts[0].reparation[0],
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// demande proforma

exports.createProforma = async (req, res) => {
  req.body.date_demande = new Date(Date.now());
  Proformat.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

// retour demande proforma
exports.retour = async (req, res) => {
  let montant_total = 0;
  req.body.reparation.map(
    (reparation) => (montant_total = montant_total + reparation.prix)
  );
  console.log(montant_total);
  const proforma = await Proformat.findOneAndUpdate(
    {
      marque: req.body.marque,
      numero: req.body.numero,
      modele: req.body.modele,
      date_demande: req.body.date_demande,
    },
    {
      reparation: req.body.reparation,
      date_retour: new Date(Date.now()),
      montant_total: montant_total,
    },
    { new: true, runValidators: true }
  );
  const client = await Client.findOne({ client_id: req.body.client_id });
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "soarabe1234@gmail.com",
      pass: "xtypmdgsbwprqjiy",
    },
  });
  var mailOptions = {
    from: "soarabe1234@gmail.com",
    to: client.mail,
    subject: "Proforma",
    html:
      '<center><p style="font-family:verdana;font-size:30px; color: rgb(59,59,59)"> PROFORMA </p><center/>' +
      '<center><p style="font-family:verdana;font-size:15px; color: black"> Nous avons étudié votre demande et le proforma est deja disponible dans notre site</p></center>' +
      '<center><a href="' +
      req.body.url +
      '"> <button style="background-color: rgb(0,128,64);border: none;color: white;padding: 15px 70px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;"> Cliquez ici pour le voir</button></a></center>',
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      res.send(info.response);
    }
  });
};

// liste des demandes de proforma

exports.liste = async (req, res) => {
  try {
    let posts = await Proformat.find({ date_retour: null });
    res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
