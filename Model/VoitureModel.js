const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const voitureSchema = new Schema({
    marque: {type:String},
    modele: {type:String},
    numero: {type:String},
    type_voiture: {type:String},
    client_id: {type:Number},
    reparation : []
    /*reparation: [{
        date_deposition: {type:Date},
        date_reception: {type:Date},
        montant_total: {typr:Number},
        montant_paye: {type:Number},
        liste_reparation : [{
            reparation: {type:String},
            prix: {type:Number},
            avancement: {type:Number}
        }],
        paiement: [{
            montant: {type:Number},
            date: {type:Date},
            validation: {type:Number}
        }],
        date_recuperation: {type:Date},
        bon_sortie: {type:Date}
    }]*/
});

let Voiture = mongoose.model("Voiture", voitureSchema,"Voiture");
// create and export model
module.exports = {Voiture}