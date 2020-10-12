var mongoose= require("mongoose");
mongoose.connect('mongodb://localhost:27017/DemoDb',{ useNewUrlParser: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

const subscriberSchema = new mongoose.Schema({
  name:String,
  product:String,
  phone:Number,
 latitude :String,
 longitude:String
});

// const userloginSchema= new mongoose.Schema({
// email:String,
// password:String
// });
//module.exports=mongoose.model('userlogins',userloginSchema)
module.exports = mongoose.model('Subscriber', subscriberSchema)