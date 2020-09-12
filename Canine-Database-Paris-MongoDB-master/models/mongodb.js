/**
 * @author ${Manoj Reddy}
 * This file is created for MongoDB connection
 */
const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://kt:kt@mongodb01-biyfk.mongodb.net/dogsDB', {useNewUrlParser: true}, (err) => {
if (!err) {
console.log('Connection with MongoDB was success.')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
 
//Connecting Node and MongoDB here
require('./dog.model');