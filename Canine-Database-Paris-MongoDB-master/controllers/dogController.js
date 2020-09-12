/**
 * @author ${Manoj Reddy}
 *
 * This Controller will have requests for CRUD operations like Insert, Read , Update, Delete to Mongo dB
 */

//Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
//Link
const Dog = mongoose.model('Dog');
 
//Router Controller for READ request
router.get('/',(req, res) => {
res.render("dog/dogAddEdit", {
viewTitle: "Add a Dog record"
});
});
 
//Router Controller for UPDATE request
// Here if the request body contains an existing Id then it goes to Update or else goes to Insert
router.post('/', (req,res) => {
if (req.body._id == '')
insertIntoMongoDB(req, res);
else
updateIntoMongoDB(req, res);
});
 
//Creating function to insert data into MongoDB
function insertIntoMongoDB(req,res) {
var dog = new Dog();
dog.dogName = req.body.dogName;
dog.dogBreed = req.body.dogBreed;
dog.dogHeight = req.body.dogHeight;
dog.dogWeight = req.body.dogWeight;
dog.dogAge = req.body.dogAge;
dog.save((err, doc) => {
if (!err)
res.redirect('dog/list');
else
console.log('Error during inserting Dog details : ' + err);
});
}
 
//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
Dog.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
if (!err) { res.redirect('dog/list'); }
else {
if (err.name == 'ValidationError') {
handleValidationError(err, req.body);
res.render("dog/dogAddEdit", {
//Retaining value to be displayed in the child view
viewTitle: 'Update Dog Details',
employee: req.body
});
}
else
console.log('Error during updating the Dog Details: ' + err);
}
});
}
 
//Router to retrieve the complete list of available Dogs
router.get('/list', (req,res) => {
Dog.find((err, docs) => {
if(!err){
res.render("dog/list", {
list: docs
});
}
else {
console.log('Failed to retrieve the Dog data: '+ err);
}
});
});
 
//Creating a function to implement input validations
function handleValidationError(err, body) {
for (field in err.errors) {
switch (err.errors[field].path) {
case 'dogName':
body['dogNameError'] = err.errors[field].message;
break;
default:
break;
}
}
}
 
//Router to update a Dog using it's ID
router.get('/:id', (req, res) => {
Dog.findById(req.params.id, (err, doc) => {
if (!err) {
res.render("dog/dogAddEdit", {
viewTitle: "Update Dog Details",
dog: doc
});
}
});
});
 
//Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
Dog.findByIdAndRemove(req.params.id, (err, doc) => {
if (!err) {
res.redirect('/dog/list');
}
else { console.log('Failed to Delete Dog Data: ' + err); }
});
});

module.exports = router;