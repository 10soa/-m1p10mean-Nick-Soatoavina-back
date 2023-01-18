const express = require("express");
const router = express.Router();

// Require controller modules.
const proformatControlleur = require("../Controlleur/ProformatControlleur");

router.get("/", proformatControlleur.liste);
router.post("/demande", proformatControlleur.createProforma);
module.exports = router;
