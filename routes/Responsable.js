const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const responsableControlleur = require('../Controlleur/ResponsableControlleur')
 
router.get('/', responsableControlleur.getResponsable);
router.post("/login", responsableControlleur.login);
 
module.exports = router;