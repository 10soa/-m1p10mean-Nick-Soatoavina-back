// Import the mongoose module
const mongoose = require('mongoose');
// Set up default mongoose connection
//mongodb+srv://NickSoa:nick1234@cluster0.aarxxjp.mongodb.net/?retryWrites=true&w=majority
const mongoDB = 'mongodb+srv://NickSoa:nick1234@cluster0.aarxxjp.mongodb.net/Test?retryWrites=true&w=majority';
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
 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


