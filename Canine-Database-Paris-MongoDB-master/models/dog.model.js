/**
 * @author ${Manoj Reddy}
 *
 * This is a Data model with the required Details(Feilds)
 */

const mongoose = require('mongoose');
 
//Attributes of the Dog object
var dogSchema = new mongoose.Schema({
dogName: {
type: String,
required: 'This field is required!'
},
dogBreed: {
type: String,
required: 'This field is required!'
},
dogHeight: {
type: String
},
dogWeight: {
    type: String
    },
dogAge: {
type: String
}
});
 
mongoose.model('Dog', dogSchema);