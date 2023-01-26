const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const clientControlleur = require('../Controlleur/ClientControlleur')
 
router.get('/', clientControlleur.getClients);
router.get('/clientNonValider',clientControlleur.listeClientNonValider);
router.get('/:client_id', clientControlleur.getClient);
router.post('/', clientControlleur.createClient);
router.put('/:client_id', clientControlleur.updateClient);
router.delete('/:client_id', clientControlleur.deleteClient);
router.post('/inscriptionClient', clientControlleur.inscriptionClient);
router.post('/validationCompte', clientControlleur.validerCompteClient);
router.get('/clientInscription/:nom/:prenom/:mail', clientControlleur.clientInscription);

module.exports = router;