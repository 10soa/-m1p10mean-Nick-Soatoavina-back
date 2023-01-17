const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const reparationSchema = new Schema({
    reparation: {type:String},
    montant: {type:Number},
    type_voiture: {type:String}
});

let Reparation = mongoose.model("Reparation", reparationSchema,"Reparation");
// create and export model
module.exports = {Reparation}