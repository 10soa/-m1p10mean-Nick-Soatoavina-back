const express = require("express");
const router = express.Router();
const voitureControlleur = require("../Controlleur/VoitureControlleur");

router.get("/", voitureControlleur.getVoitures);
router.get("/voitureRecupere", voitureControlleur.listeVoitureBD);
router.post(
  "/:marque/:modele/:numero/:type_voiture/:client_id/",
  voitureControlleur.insertionDepot
);
router.post(
  "/receptionVoiture/:id/:dateDepos",
  voitureControlleur.receptionVoiture
);
router.get("/listeVoitureDeposer", voitureControlleur.listeVoitureDeposer);
router.get("/facture/:id", voitureControlleur.getFactureReparation);
router.get("/clientFactures/:client_id", voitureControlleur.getClientFacture);
router.put("/paiement/:client_id", voitureControlleur.paiement);
router.put("/validationBD", voitureControlleur.validationBD);
router.get(
  "/reparationAvecAvancement",
  voitureControlleur.reparationAvecAvancement
);

router.get("/historique/:client_id", voitureControlleur.historiqueClient);
router.get("/historiqueVoiture", voitureControlleur.historiqueVoiture);
module.exports = router;
