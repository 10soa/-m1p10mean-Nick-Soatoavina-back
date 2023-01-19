/* eslint-disable no-console */
var { Client } = require('../Model/ClientModel');
var ObjectID = require('mongoose').Types.ObjectId;
var nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
const { Console } = require('console');

exports.getClients = async (req, res) => {
    try {
        let data = await Client.find();
        res.status(200).json({
        status: 200,
        data: data
        });
    }catch (err) {
        res.status(400).json({
        status: 400,
        message: err.message,
        });
    }
};

exports.getClient = async (req, res) => {
    Client.findOne({ client_id: req.params.client_id })
    .then(data => res.status(200).json({ data }))
    .catch((error) => res.status(404).json({msg: error}))
};

exports.createClient = async (req, res) => {
    Client.create(req.body)
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({msg:  error }))
};

exports.updateClient = async (req, res) => {
    Client.findOneAndUpdate({ client_id: req.params.client_id }, req.body, { new: true, runValidators: true })
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({msg: error }))
};

exports.deleteClient = async (req, res) => {
    Client.findOneAndDelete({ client_id: req.params.client_id })
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({msg: error }))
};

/* Inscription Client */
exports.inscriptionClient= async (req,res) => {
    Client.create(req.body)
    .then(data => {
        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'soarabe1234@gmail.com',
              pass: 'xtypmdgsbwprqjiy'
            }
        });
        var mailOptions = {
            from: 'soarabe1234@gmail.com',
            to: req.body.mail,
            subject: 'Inscription sur Reparation_Voiture',
            html:
            '<p>'+req.body.mail+' : Verification de votre compte G-mail.</p>' +
            '<a href=#"><button style="background-color: rgb(100,148,44);border: none;color: white;padding: 15px 70px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;"> Cliquez ici pour verifier!</button></a>',
        };
        mail.sendMail(mailOptions, function(error, info){
            if (error) {
              res.send(error);
            } else {
              res.send(info.response);
            }
        });
    })
    .catch((error) => res.status(500).json({msg:  error }))
};

/* validation compte du client */
exports.validerCompteClient = async (req, res) => {
    Client.findOneAndUpdate({ client_id: req.params.client_id }, {valider : 1 }, { new: true, runValidators: true })
    .then(result => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({msg: error }))
};