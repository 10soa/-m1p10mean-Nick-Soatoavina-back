const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const proformatSchema = new Schema({
  marque: { type: String },
  modele: { type: String },
  numero: { type: String },
  type_voiture: { type: String },
  client_id: { type: Number },
  reparation: [],
  /*reparation: [{
        reparation : {type:String},
        prix : {type:Number}
    }],*/
  date_demande: { type: Date },
  date_retour: { type: Date },
  montant_total: { type: Number },
});

let Proformat = mongoose.model("Proformat", proformatSchema, "Proformat");

// create and export model
module.exports = { Proformat };
