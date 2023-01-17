const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const responsableControlleur = require('../Controlleur/ResponsableControlleur')
 
router.get('/', responsableControlleur.getResponsable);
 
module.exports = router;