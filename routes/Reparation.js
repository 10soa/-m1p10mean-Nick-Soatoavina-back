const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const reparationControlleur = require('../Controlleur/ReparationControlleur')
 
router.get('/', reparationControlleur.getReparation);
 
module.exports = router;