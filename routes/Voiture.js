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
router.get("/countListeVoitureDeposer", voitureControlleur.countlisteVoitureDeposer);
router.get("/listeVoitureDeposer/:off/:lim", voitureControlleur.listeVoitureDeposer);
router.get("/facture/:id", voitureControlleur.getFactureReparation);
router.get("/clientFactures/:client_id", voitureControlleur.getClientFacture);
router.put("/paiement/:client_id", voitureControlleur.paiement);
router.put("/validationBD", voitureControlleur.validationBD);

router.get(
  "/reparationAvecAvancement",
  voitureControlleur.reparationAvecAvancement
);
router.get("/countreparationAvecAvancement", voitureControlleur.countreparationAvecAvancement);
router.get("/reparationAvecAvancement/:off/:lim", voitureControlleur.reparationAvecAvancement);
router.put("/modificationAvancement/:marque/:modele/:numero/:type_voiture/:client_id/:dateDepos/:nomRep/:avance", voitureControlleur.modificationAvancement);
router.get("/countlistePaiementNV", voitureControlleur.countlistePaiementNonValider);
router.get("/listePaiementNV/:off/:lim", voitureControlleur.listePaiementNonValider);
router.put("/validationPaiement", voitureControlleur.validationPaiement);
router.get("/recuperationVoiture/:client_id", voitureControlleur.recuperationVoiture);
router.put("/validationRecuperationVoiture/:marque/:modele/:numero/:type_voiture/:client_id/:montant/:dateDepos", voitureControlleur.validationRecuperationVoiture);
router.get("/countListeBonSortie", voitureControlleur.countListeBonSortie);
router.get("/listeBonSortie/:off/:lim", voitureControlleur.listeBonSortie);
router.get("/historique/:client_id", voitureControlleur.historiqueClient);
router.get("/historiqueVoiture", voitureControlleur.historiqueVoiture);
router.get(
  "/statistique/tempsMoyenReparation",
  voitureControlleur.tempsMoyenReparation
);
router.get("/statistique/benefice", voitureControlleur.benefice);
router.get("/statistique/chiffreAffaire", voitureControlleur.chiffreAffaire);
router.get("/listeReparationVoiture1/:client_id/:dateDepos", voitureControlleur.listeReparationVoiture1);
router.get("/reparationAvancementClient/:client_id", voitureControlleur.listeReparationClient);
//router.get("/reparationAvancementClient/:client_id", voitureControlleur.listeReparationClient);

module.exports = router;
