var Responsable = require("../repository/Responsable");
var Client = require("../repository/Client");

// LOGIN Utilisateur
exports.login = async (req, res) => {
  try {
    const client = await Client.login(req.body.nom, req.body.mdp, res);
    if (client) {
      res.status(200).json({ type_user: "client", utilisateur: client });
    } else {
      const responsable = await Responsable.login(
        req.body.nom,
        req.body.mdp,
        res
      );
      if (responsable) {
        res
          .status(200)
          .json({ type_user: responsable.type, utilisateur: responsable });
      } else {
        res.status(400).json({
          status: 400,
          message: " Mot de passe ou nom d'utilisateur inexact",
        });
      }
    }
  } catch (err) {}
};
