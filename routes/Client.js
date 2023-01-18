const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const clientControlleur = require('../Controlleur/ClientControlleur')
 
router.get('/', clientControlleur.getClients);
router.get('/:client_id', clientControlleur.getClient);
router.post('/', clientControlleur.createClient);
router.put('/:client_id', clientControlleur.updateClient);
router.delete('/:client_id', clientControlleur.deleteClient);
router.post('/inscriptionClient', clientControlleur.inscriptionClient);
router.put('/validationCompte/:client_id', clientControlleur.validerCompteClient);

module.exports = router;