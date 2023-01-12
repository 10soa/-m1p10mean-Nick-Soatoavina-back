const mongoose = require( 'mongoose')
 
const Personne = mongoose.model( 'Personne', {
  nom: {
    type: String,
  },
  age : {
    type: Number,
  },
})
 
module.exports = { Personne }