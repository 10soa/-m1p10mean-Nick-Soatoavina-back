const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const depenseControlleur = require('../Controlleur/DepenseControlleur')
 
router.get('/', depenseControlleur.getDepense);
 
module.exports = router;