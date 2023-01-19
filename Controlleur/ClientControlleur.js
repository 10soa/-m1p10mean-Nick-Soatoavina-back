/* eslint-disable no-console */
const clientRepository = require("../repository/Client");

exports.getClients = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: await clientRepository.getClients(),
    });
  } catch (err) {}
};

exports.getClient = async (req, res) => {
  clientRepository
    .getClient(req.params.client_id, res)
    .then((data) => res.status(200).json({ data }))
    .catch(error);
};

exports.createClient = async (req, res) => {
  clientRepository
    .createClient(req.body, res)
    .then((result) => res.status(200).json({ result }))
    .catch(error);
};

exports.updateClient = async (req, res) => {
  clientRepository
    .updateClient(req.params.client_id, req.body, res)
    .then((result) => res.status(200).json({ result }))
    .catch(error);
};

exports.deleteClient = async (req, res) => {
  clientRepository
    .deleteClient(req.params.client_id, res)
    .then((result) => res.status(200).json({ result }))
    .catch(error);
};

/* Inscription Client */
exports.inscriptionClient = async (req, res) => {
  clientRepository
    .inscriptionClient(req.body, res)
    .then((result) => res.status(200).json({ result }))
    .catch(error);
};

/* validation compte du client */
exports.validerCompteClient = async (req, res) => {
  clientRepository
    .validerCompteClient(req.params.client_id, res)
    .then((result) => res.status(200).json({ result }))
    .catch(error);
};
