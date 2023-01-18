require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
 
// const PORT = process.env.PORT || 2002 ;
const personneRoutes = require('./routes/Personne');

const clientRoutes = require('./routes/Client');
const depenseRoutes = require('./routes/Depense');
const paiementRoutes = require('./routes/Paiement');
const proformatRoutes = require('./routes/Proformat');
const reparationRoutes = require('./routes/Reparation');
const responsableRoutes = require('./routes/Responsable');
const voitureRoutes = require('./routes/Voiture');

/* database connection */
require('./config/database');
 
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* routes */
app.use('/Mean_projet/Personne', personneRoutes);

app.use('/Mean_projet/Proforma', proformatRoutes);
app.use('/Mean_projet/Voiture', voitureRoutes);
app.use('/Mean_projet/Client', clientRoutes);
app.use('/Mean_projet/Depense', depenseRoutes);
app.use('/Mean_projet/Paiement', paiementRoutes);
app.use('/Mean_projet/Reparation', reparationRoutes);
app.use('/Mean_projet/Responsable', responsableRoutes);

/*server running status */
/*app.listen(PORT, () => {
  console.log(`Démarrage du serveur avec port : ${PORT}`)
});*/

module.exports = app;
