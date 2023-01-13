const mongoose = require( 'mongoose')
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const PersonneSchema = new Schema({
    nom: {
        type:String,
    },
    age:{
        type:Number,
    }
});

let Personne = mongoose.model("Personne", PersonneSchema,"Personne");
// create and export model
module.exports = {Personne}