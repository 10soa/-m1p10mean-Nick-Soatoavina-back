const express = require("express");
const router = express.Router();

// Require controller modules.
const proformatControlleur = require("../Controlleur/ProformatControlleur");

router.get("/", proformatControlleur.liste);
router.get("/client/:client_id", proformatControlleur.proformaClient);
router.post("/reponse", proformatControlleur.retour);
router.post("/demande", proformatControlleur.createProforma);
router.get("/listeProformatClient1Valide/:client_id", proformatControlleur.listeProformaClient1Valide);
router.get("/listeProformaClient1EnCours/:client_id", proformatControlleur.listeProformaClient1EnCours);
module.exports = router;
