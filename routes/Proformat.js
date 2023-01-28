const express = require("express");
const router = express.Router();

// Require controller modules.
const proformatControlleur = require("../Controlleur/ProformatControlleur");

router.get("/", proformatControlleur.liste);
router.get("/client/:client_id", proformatControlleur.proformaClient);
router.post("/reponse", proformatControlleur.retour);
router.post("/demande", proformatControlleur.createProforma);
router.get("/listeProformatClient1/:client_id/:off/:lim", proformatControlleur.listeProformatClient1);
router.get("/countListeProformaClient1/:client_id", proformatControlleur.countlisteProformatClient1);
module.exports = router;
