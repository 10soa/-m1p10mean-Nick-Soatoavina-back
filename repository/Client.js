var { Client } = require("../Model/ClientModel");
var ObjectID = require("mongoose").Types.ObjectId;
var nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");
const { Console } = require("console");

exports.getClients = async (res) => {
  try {
    let data = await Client.find();
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.getClient = async (client_id, res) => {
  try {
    let data = await Client.findOne({ client_id: client_id });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

exports.createClient = async (body, res) => {
  try {
    let data = await Client.create(body);
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

exports.updateClient = async (client_id, body, res) => {
  try {
    let data = await Client.findOneAndUpdate({ client_id: client_id }, body, {
      new: true,
      runValidators: true,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

exports.deleteClient = async (client_id, res) => {
  try {
    let data = await Client.findOneAndDelete({
      client_id: client_id,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

/* Inscription Client */
exports.inscriptionClient = async (body, res) => {
  body.valider = 0;
  Client.create(body)
    .then((data) => {
      var mail = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "soarabe1234@gmail.com",
          pass: "xtypmdgsbwprqjiy",
        },
      });
      var mailOptions = {
        from: "soarabe1234@gmail.com",
        to: body.mail,
        subject: "Inscription sur Reparation_Voiture",
        html:
          "<p>" +
          body.mail +
          " : Verification de votre compte G-mail.</p>" +
          '<a href=http://localhost:4200/#/verificationMail/'+body.nom+'/'+body.prenom+'/'+body.mail+'><button style="background-color: rgb(100,148,44);border: none;color: white;padding: 15px 70px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;"> Cliquez ici pour verifier!</button></a>',
      };
      mail.sendMail(mailOptions, function (err, info) {
        if (err) {
          res.send(err);
        } else {
          return data;
        }
      });
      return data;
    })
    .catch((err) => res.status(500).json({ msg: err }));
};

/* validation compte du client */
exports.validerCompteClient = async (nom,prenom,mail, res) => {
  try {
    let data = await Client.findOneAndUpdate(
      { nom: nom,prenom:prenom,mail:mail },
      { valider: 1 },
      { new: true, runValidators: true }
    );
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// Login Client

exports.login = async (username, mdp) => {
  try {
    let data = await Client.findOne({ nom_utilisateur: username, mdp: mdp });
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

/* Liste des clients non validés */
exports.listeClientNonValider = async (res) => {
  try {
    let data=await Client.find({valider:0});
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
}

/* Client Inscription */
exports.clientInscription = async (req,res)=>{
  try {
    let data=await Client.find({nom:req.params.nom,prenom:req.params.prenom,mail:req.params.mail});
    return data;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
}