const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const clientControlleur = require('../Controlleur/ClientControlleur')
 
router.get('/', clientControlleur.getClient);
 
module.exports = router;