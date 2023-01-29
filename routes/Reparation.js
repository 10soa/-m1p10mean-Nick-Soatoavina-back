const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const reparationControlleur = require('../Controlleur/ReparationControlleur')
 
router.get('/typeVoiture', reparationControlleur.reparationTypeVoiture);
router.get('/:off/:lim', reparationControlleur.getReparations);
router.get('/countReparation', reparationControlleur.countReparations);
router.get('/:reparation_id', reparationControlleur.getReparation);
router.post('/', reparationControlleur.createReparation);
router.put('/:reparation_id', reparationControlleur.updateReparation);
router.delete('/:reparation_id', reparationControlleur.deleteReparation);

module.exports = router;