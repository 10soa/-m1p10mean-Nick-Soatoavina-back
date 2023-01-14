const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const personneControlleur = require('../Controlleur/PersonneControlleur')
 
router.get('/', personneControlleur.getPersonne);
 
module.exports = router;    