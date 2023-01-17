// Import the mongoose module
/*const mongoose = require('mongoose');
//mongodb+srv://NickSoa:nick1234@cluster0.aarxxjp.mongodb.net/?retryWrites=true&w=majority
/*mongodb://localhost:27017/ 
const url="mongodb://localhost:27017/";
const dbname="Base-MEAN";

const mongoDB = 'mongodb://localhost:27017/';
mongoose.set("strictQuery", false);
mongoose.connect(
  mongoDB,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },(err) => {
  if (err) {
    console.log("Connection failed :"+err);
  } else {
    console.log("Connection réussie");
  }}
);

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://NickSoa:nick1234@cluster0.aarxxjp.mongodb.net/Base_MEAN',
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("Connecté")});


