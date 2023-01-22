const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const depenseSchema = new Schema({
  date: { type: Date },
  depense: { type: String },
  montant: { type: Number },
  /*depense: [{   
        depense: {type:String},
        montant: {type:Number}
    }]*/
});

let Depense = mongoose.model("Depense", depenseSchema, "Depense");
// create and export model
module.exports = { Depense };
