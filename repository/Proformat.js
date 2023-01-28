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
    proforma.date_retour=null;
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
  var tableau =
    '<center><table style="width: 200px;font-family: Arial, Helvetica, sans-serif;border-collapse: collapse; width: 100%"><tr> ' +
    '<th style="padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #04AA6D;color: white; border: 1px solid #ddd;padding: 8px;">Reparation</th>' +
    '<th style="padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #04AA6D;color: white; border: 1px solid #ddd;padding: 8px;">Prix</th></tr>';
  proforma.reparation.forEach((rep) => {
    tableau =
      tableau +
      '<tr><td style=" background-color: #f2f2f2; border: 1px solid #ddd;padding: 8px;">' +
      rep.reparation +
      '</td><td style=" background-color: #f2f2f2; border: 1px solid #ddd;padding: 8px;">' +
      rep.prix +
      " AR </td></tr>";
  });
  tableau =
    tableau +
    '<tr><td style=" background-color: #ddd; border: 1px solid #ddd;padding: 8px;"></td><td style=" background-color: #ddd; border: 1px solid #ddd;padding: 8px;">' +
    montant_total +
    " AR </td></tr></table></center>";
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
      '<center><p style="font-family:verdana;font-size:15px; color: black"> Proforma  demandé le' +
      proforma.date_demande.toDateString() +
      "</p></center>" +
      '<center><p style="font-family:verdana;font-size:15px; color: black"> <strong> VOITURE </strong> : ' +
      proforma.marque +
      " " +
      proforma.modele +
      " </p></center" +
      '<center><p style="font-family:verdana;font-size:15px; color: black"> <strong> NUMERO</strong> : ' +
      proforma.numero +
      " </p></center" +
      tableau +
      '<br><center><a href="' +
      body.url +
      '"> <button style="background-color: rgb(0,128,64);border: none;color: white;padding: 15px 70px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;"> Lien vers le site</button></a></center>',
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

exports.liste = async (page, pageNumber, res) => {
  try {
    if (!pageNumber) pageNumber = 20;
    const data = await Proformat.find({ date_retour: null }).sort({
      date_demande: 1,
    });
    const number = data.length;
    let totalPage = Math.floor(Number(number) / pageNumber);
    if (Number(number) % pageNumber != 0) {
      totalPage = totalPage + 1;
    }
    console.log(data);
    return {
      liste: await Proformat.find({ date_retour: null })
        .sort({
          date_demande: 1,
        })
        .skip(Number(page))
        .limit(Number(pageNumber)),
      page: page,
      pageNumber: pageNumber,
      totalPage: totalPage,
    };
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

// Suppression Proformat
exports.deleteProformat = async (
  marque,
  modele,
  numero,
  type_voiture,
  client_id,
  res
) => {
  try {
    let data = Proformat.findOneAndDelete({
      marque: marque,
      modele: modele,
      numero: numero,
      type_voiture: type_voiture,
      client_id: client_id,
    });
    return data;
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

// liste proforma client
exports.proformaClient = async (client_id, res) => {
  try {
    return await Proformat.find({ client_id: client_id });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

//liste proformat valider client 1
exports.proformaClient1 = async (client_id,off,lim,res) => {
  try {
    return await Proformat.find({ client_id: client_id,date_retour: {$ne :null} })
    .skip(Number(off))
    .limit(Number(lim));
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.countproformaClient1 = async (client_id,res) => {
  try {
    var data =await Proformat.find({ client_id: client_id,date_retour: {$ne :null} });
    return data.length;
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};


