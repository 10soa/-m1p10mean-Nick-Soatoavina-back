const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Create Schema Instance and add schema propertise
const clientSchema = new Schema({
    client_id: {type:Number},
    nom: {type:String},
    prenom: {type:String},
    nom_utilisateur: {type:String},
    mdp: {type:String},
    mail: {type:String},
    adresse: {type:String},
    contact:{type:String},
    valider: {type:Number}
});

clientSchema.plugin(AutoIncrement, {id:'clientID_seq',inc_field: 'client_id'});
let Client = mongoose.model("Client", clientSchema,"Client");
// create and export model
module.exports = {Client}