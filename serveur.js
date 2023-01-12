require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
 
const PORT = process.env.PORT || 2002 ;
const PersonneRoutes = require('./routes/Personne');
 
/* database connection*/
require('./config/database');
 
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
 
/* routes */
app.use('/api/Personne', PersonneRoutes);
 
/*server running status */
app.listen(PORT, () => {
  console.log(`Démarrage du serveur avec http://localhost: ${PORT}`)
});