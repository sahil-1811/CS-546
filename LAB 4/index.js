
const connection = require('./config/mongoConnection');
const ban=require('./data/bands');
const { ObjectId } = require('mongodb');

const main = async () => {
    const db = await connection.connectToDb();
    await db.dropDatabase()
    console.log(await "1. Create a band of your choice.")
try{
    var pinkFloyd = await ban.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
    console.log(await "2. Log the newly created band.")
    console.log(await pinkFloyd)
}
catch(e){
    console.log(e)
}
console.log(await "---------------------------------------------------------------------------")
try{
    console.log("3. Create another band of your choice.")
    var beatles= await ban.create("The Beatles",["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com","Parlophone",["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
}
catch(e){
    console.log(e)
}
console.log(await "-----------------------------------------------------------------------------")
try{
    console.log(await "4. Query all bands, and log them all")
    console.log(await ban.getAll())
}
catch(e){
    console.log(e)
}
console.log(await "-----------------------------------------------------------------------------")
try{
    console.log("5. Create the 3rd band of your choice")
    var bollywood= await ban.create("Bollywood",["Romantic", "Rock", "Classic"],"http://www.bollywood.com","TVSong",["Arijit Singh", "Darshan Raval", "Atif Aslam", "Dino James"], 1901);
}
catch(e){
    console.log(e)
}
console.log(await "----------------------------------------------------------------------------------------")
try{
    console.log(await "6. Log the newly created 3rd band. (Just that band, not all bands)")
     console.log(await ban.get(bollywood._id.toString()))
}
catch(e){
    console.log(e)
}
console.log(await "----------------------------------------------------")
try{
    console.log(await "7. Rename the first band")
    console.log(await "8. Log the first band with the updated name. ")
     console.log(await ban.rename(pinkFloyd._id.toString(), "FLoyd Pink"))
}
catch(e){
    console.log(e)
}
console.log(await "----------------------------------------------------")
try{
    console.log(await "9. Remove the second band you created.")
    console.log(await ban.remove(beatles._id.toString()))

}
catch(e){
    console.log(e)
}
console.log(await "-----------------------------------------------------------------------------")
try{
    console.log(await "10. Query all bands, and log them all")
    console.log(await ban.getAll())
}
catch(e){
    console.log(e)
}
console.log(await "-----------------------------------------------------------------------------")
try{
    console.log(await "11. Try to create a band with bad input parameters to make sure it throws errors.")
    var errorcreation = await ban.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI ", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 2023);
}
catch(e){
    console.log(e)
}
console.log(await "----------------------------------------------------")
try{
    console.log(await "12. Try to remove a band that does not exist to make sure it throws errors.")
    newid=ObjectId()
     console.log(await ban.remove(newid.toString()))
}
catch(e){
    console.log(e)
}
console.log(await "----------------------------------------------------")
try{
    console.log(await "13. Try to rename a band that does not exist to make sure it throws errors.")
    newid1=ObjectId()
    console.log(await ban.rename(newid1.toString(), "FLoyd Pink"))
}
catch(e){
    console.log(e)
}
console.log(await "----------------------------------------------------")
try{
    console.log(await "14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.")
    console.log(await ban.rename(pinkFloyd._id.toString(), 123))
}
catch(e){
    console.log(e)
}
console.log(await "----------------------------------------------------------------------------------------")
try{
    console.log(await "Try getting a band by ID that does not exist to make sure it throws errors.")
    newid2=ObjectId()
     console.log(await ban.get(newid2.toString()))
}
catch(e){
    console.log(e)
}
console.log(await "-----------------------------------------------------------------------------")
await connection.closeConnection();
  console.log('Assignment Done!');


}
main()