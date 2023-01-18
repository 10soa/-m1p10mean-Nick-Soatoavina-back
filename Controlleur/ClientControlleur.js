/* eslint-disable no-console */
var { Client } = require('../Model/ClientModel');
var ObjectID = require('mongoose').Types.ObjectId;


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
