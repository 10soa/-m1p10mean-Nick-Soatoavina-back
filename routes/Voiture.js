const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const voitureControlleur = require('../Controlleur/VoitureControlleur')
 
router.get('/', voitureControlleur.getVoitures);
 
module.exports = router;