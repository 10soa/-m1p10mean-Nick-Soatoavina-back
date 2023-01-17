const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const paiementControlleur = require('../Controlleur/PaiementControlleur')
 
router.get('/', paiementControlleur.getPaiement);
 
module.exports = router;