var { Proformat } = require("../Model/ProformatModel");
var Client = require("../repository/Client");
var ObjectID = require("mongoose").Types.ObjectId;
var nodemailer = require("nodemailer");

exports.getProforma = async (req, res) => {
  try {
    let posts = await Proformat.find();
    return posts;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// demande proforma

exports.createProforma = async (proforma, res) => {
  try {
    proforma.date_demande = new Date(Date.now());
    let data = await Proformat.create(proforma);
    return data;
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// retour demande proforma
exports.retour = async (body, res) => {
  let montant_total = 0;
  body.reparation.map(
    (reparation) => (montant_total = montant_total + reparation.prix)
  );
  const proforma = await Proformat.findOneAndUpdate(
    {
      marque: body.marque,
      numero: body.numero,
      modele: body.modele,
      date_demande: body.date_demande,
    },
    {
      reparation: body.reparation,
      date_retour: new Date(Date.now()),
      montant_total: montant_total,
    },
    { new: true, runValidators: true }
  );
  const client = await Client.getClient(body.client_id);
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
      body.url +
      '"> <button style="background-color: rgb(0,128,64);border: none;color: white;padding: 15px 70px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;"> Cliquez ici pour le voir</button></a></center>',
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    } else {
      //   res.send(info.response);
    }
  });
  return proforma;
};

// liste des demandes de proforma

exports.liste = async (res) => {
  try {
    let posts = await Proformat.find({ date_retour: null });
    return posts;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
