const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const PaiementSchema = new Schema({
    date_paiement: {type:Date},
    montant: {type:Number},
});

let Paiement = mongoose.model("Paiement", PaiementSchema,"Paiement");
// create and export model
module.exports = {Paiement}