/*
Created on Wed Dec 11 02:19:20 2019
@authors: Manoj Reddy

                           *********   Dogs - CRUD Operations in MongoDB   *********
*/



// ****Insert*****             will perform an insert operation into a collection of a document.
db.dogs.insert({
	dogName: "Cheryta",
	dogAge: "4",
        dogHeight: "2",
        dogWeight: "23",
        dogBreed: "Pug"
	
})

// ***Insert Many ****
db.dogs.insertMany([
   { dogName: "Schooby", dogAge: "11", dogHeight: "4", dogWeight: "51" , dogBreed: "Hound"},
      { dogName: "Pinky", dogAge: "5", dogHeight: "2", dogWeight: "11" , dogBreed: "Bull"},
      { dogName: "Cookie", dogAge: "16", dogHeight: "5", dogWeight: "23" , dogBreed: "Pomeranian"},
      { dogName: "Pinnhy", dogAge: "11", dogHeight: "4", dogWeight: "51" , dogBreed: "German Shepherd"},
      { dogName: "Rocky", dogAge: "11", dogHeight: "4", dogWeight: "51" , dogBreed: "Chihuahua"},
      { dogName: "Darn", dogAge: "11", dogHeight: "4", dogWeight: "51" , dogBreed: "Beagle"},
      { dogName: "Dun", dogAge: "11", dogHeight: "4", dogWeight: "51" , dogBreed: "Beagle"},
      { dogName: "Cucky", dogAge: "11", dogHeight: "4", dogWeight: "51" , dogBreed: "Boxer"}
   
])

// ****Read*****             To retrieve (Select) the inserted document
//Please observe that the record retrieved contains an attribute called _id with some unique identifier value called ObjectId which acts as a document identifier.
db.dogs.find()
db.dogs.find().pretty() //pretty results in same order
db.dogs.find().limit(2) // limits to 2 records



//Record is to be retrieved based on some criteria
db.dogs.find({"dogName":"Dun"}) // Single

//Comparison Query Operations
db.dogs.find({"dogName": { $in: [ "Cucky", "Schooby" ]}}) // Multiple
db.dogs.find({dogAge: { $gt: "2" } } ) // Age greater than 2
db.dogs.find({dogHeight: { $lt: "5" } } ) // Height less than 5





//// ****Update*****         Updating a document in a collection(Update)
db.dogs.update({
	"dogName": "Cucky"	
},
{
	"dogAge":"6"
})

//Update multiple records
db.dogs.updateMany(
   { "dogAge": { $lt: 2 } },
   {
     $set: { dogName: "Huntree", dogAge: "89" , dogHeight: "4" },
   }
)


//// ****Delete*****         Removing an entry from the collection(Delete)
db.dogs.remove({"dogName":"Cherry"})
db.dogs.deleteMany({}) // Deletes all records


//Data Relationships in MongoDB
//One to One
db.dogs.insert({
	dogName: "Wateriso",
        dogAge: "212",
        dogHeight: "2",
        dogBreed: "waterWok",
        dogFight: {
            dogName: "Wateriso",
            FightId: "66",
            FightTime:"20 min",
        } 
})


//Indexing 
//Creating an Index using createIndex()
db.dogs.createIndex({dogName : "Cherry" }) // Single Feild
db.dogs.createIndex({dogName : "Cherry", dogAge : 3}) //Multiple feilds


//Sorting
db.dogs.find().sort({dogAge : 1}) //Ascending order
db.dogs.find().sort({dogName : -1}) //Descending order

//To sort the results by "dogName" in the ascending order and "dogAge" in the descending order
db.dogs.find().sort({dogName : 1, dogAge : -1}) 




//Aggregation
db.dogs.aggregate([{$group : {_id: "$type", category: {$sum : 1}}}])



db.dogs.explain() 

