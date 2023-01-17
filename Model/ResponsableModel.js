const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const responsableSchema = new Schema({
    nom: {type:String},
    mdp: {type:String},
    type: {type:String}
});

let Responsable = mongoose.model("Responsable", responsableSchema,"Responsable");
// create and export model
module.exports = {Responsable}