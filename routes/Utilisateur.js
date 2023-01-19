const express = require("express");
const router = express.Router();

// Require controller modules.
const UtilisateurControlleur = require("../Controlleur/UtilisateurControlleur");

router.post("/", UtilisateurControlleur.login);

module.exports = router;
