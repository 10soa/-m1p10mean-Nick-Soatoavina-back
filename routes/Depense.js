const express = require("express");
const router = express.Router();

// Require controller modules.
const depenseControlleur = require("../Controlleur/DepenseControlleur");

router.get("/", depenseControlleur.getDepenses);
router.get("/:depense_id", depenseControlleur.getDepense);
router.post("/", depenseControlleur.createDepense);
router.put("/:depense_id", depenseControlleur.updateDepense);
router.delete("/:depense_id", depenseControlleur.deleteDepense);

module.exports = router;
