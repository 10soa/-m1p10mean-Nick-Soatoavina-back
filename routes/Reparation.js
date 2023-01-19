const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const reparationControlleur = require('../Controlleur/ReparationControlleur')
 
router.get('/', reparationControlleur.getReparations);
router.get('/:reparation_id', reparationControlleur.getReparation);
router.post('/', reparationControlleur.createReparation);
router.put('/:reparation_id', reparationControlleur.updateReparation);
router.delete('/:reparation_id', reparationControlleur.deleteReparation);

module.exports = router;