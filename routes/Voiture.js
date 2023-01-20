const express = require( 'express');
const router = express.Router();
 
// Require controller modules.
const voitureControlleur = require('../Controlleur/VoitureControlleur')
 
router.get('/', voitureControlleur.getVoitures);
router.post('/:marque/:modele/:numero/:type_voiture/:client_id/',voitureControlleur.insertionDepot);
router.put('/receptionVoiture/',voitureControlleur.receptionVoiture);
router.get('/listeVoitureDeposer', voitureControlleur.listeVoitureDeposer);

module.exports = router;