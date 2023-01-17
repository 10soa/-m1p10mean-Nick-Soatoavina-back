const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const reparationControlleur = require('../Controlleur/ReparationControlleur')
 
router.get('/', reparationControlleur.getReparations);
router.get('/:reparation', reparationControlleur.getReparation);
router.post('/', reparationControlleur.createReparation);
router.put('/:reparation', reparationControlleur.updateReparation);
router.delete('/:reparation', reparationControlleur.deleteReparation);

module.exports = router;