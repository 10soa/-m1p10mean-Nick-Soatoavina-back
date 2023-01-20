const express = require("express");
const router = express.Router();
const voitureControlleur = require("../Controlleur/VoitureControlleur");

router.get("/", voitureControlleur.getVoitures);
router.post('/:marque/:modele/:numero/:type_voiture/:client_id/',voitureControlleur.insertionDepot);
router.post('/receptionVoiture/:id/:dateDepos',voitureControlleur.receptionVoiture);
router.get('/listeVoitureDeposer', voitureControlleur.listeVoitureDeposer);
router.get("/facture/:id", voitureControlleur.getFactureReparation);
router.get("/clientFactures/:client_id", voitureControlleur.getClientFacture);
router.post("/paiement/:client_id", voitureControlleur.paiement);
module.exports = router;
