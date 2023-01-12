const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const personneControlleur = require('../Controlleur/PersonneControlleur')
 
router.get('/', personneControlleur.findAll);
 
router.post('/', personneControlleur.insert);
 
router.put('/:id', personneControlleur.update);
 
router.delete('/:id', personneControlleur.delete);
 
module.exports = router;