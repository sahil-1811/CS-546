const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
const connection = require('../config/mongoConnection');


async function create(name, genre, website, recordLabel, bandMembers, yearFormed) {
    //console.log(genre.length)
    if(name==undefined|| genre==undefined|| website==undefined|| recordLabel==undefined|| bandMembers==undefined|| yearFormed==undefined)
    {throw " Error: All fields need to have valid values"}
    if(typeof name!=="string"||typeof website!=="string"||typeof recordLabel!=="string"){throw "Error: Only String Input"}
    if(name.trim().length==0||website.trim().length==0||recordLabel.trim().length==0){throw "Error: Empty Spaces not allowed"}
    website=website.toLowerCase()
    if(website.endsWith(".com")!==true){throw " Error : .com is missing"}
    if(website.includes("http://www.")==false){throw "Error: http://www. is missing"}
    if(website.slice(11,-4).length<5){throw" Error: Should contain atleast 5 letters between http://www. and.com"}
    if(!Array.isArray(genre)){throw" Error: Genre should be array"}
    if(!Array.isArray(bandMembers)){throw" Error: BandMembers should be array"}
    if(genre.length<1 || bandMembers.length<1){throw"Error: should contain minimum one input"}
    for(i=0;i<genre.length;i++){
        if(typeof genre[i]!=="string"){throw "Error: Genre inputs should be strings"}
        if(genre[i].trim().length==0){throw"Error: Genre Empty strings not allowed"}
     }
    for(j=0;j<bandMembers.length;j++){
        if(typeof bandMembers[j]!=="string"){throw "Error: bandMembers inputs should be strings"}
        if(bandMembers[j].trim().length==0){throw"Error: Genre Empty strings not allowed"}
     }
    if(typeof yearFormed!=="number"){throw" Error: Year should be number"}
    if(yearFormed<1900 ||yearFormed>2022){throw" Error: Year Should be between 1900-2022"}

    const bandCollection = await bands();


    let band = {
        // _id: ObjectId, 
        name: name.trim(),
        genre: genre,
        website: website.trim(),
        recordLabel : recordLabel.trim(),
        bandMembers : bandMembers,
        yearFormed : yearFormed,
        
    }
    const insertInfo = await bandCollection.insertOne(band);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add band';
    console.log( await`${name} created`)
    const newId = insertInfo.insertedId.toString();

    const bad = await this.get(newId);
    return bad;
}

async function getAll(){
    const bandCollection = await bands();
    const bandlist=await bandCollection.find({}).toArray()
    if(!bandlist){
        throw "Error: Bandlist not found"
    }
    for(i=0;i<bandlist.length;i++){
        bandlist[i]._id = bandlist[i]._id.toString()
    }
    return bandlist
}

async function get(id){
    if(id==undefined){throw"Error: Provide Id"}
    if(typeof id!=="string"){throw"Error: Not a String"}
    if(id.trim().length==0){throw"Error: Empty Spaces not allowed"}
    id=id.trim()
    if(!ObjectId.isValid(id)){throw "Error: Invalid ObjectID"}
    const bandCollection=await bands()
    const bandid=await bandCollection.findOne(_id=ObjectId(id))
    if (bandid==null){throw"Error: bandid not found"}
    bandid._id = bandid._id.toString()
    return bandid
}

async function remove(id){
    if(id==undefined){throw " Error: Provide Id"}
    if (typeof id!== "string"){throw " Error: Id is not a string"}
    if(id.trim().length==0){throw " Error:  Empty Spaces not allowed"}
    id=id.trim()
    if(!ObjectId.isValid(id)){throw"Error: Object Id invalid"}
    var bandCollection=await bands()
    const bandid1=await bandCollection.findOne(_id=ObjectId(id))
    const delband=await bandCollection.deleteOne({_id:ObjectId(id)})
    if (delband.deletedCount === 0) {
        throw `Could not delete band with id of ${id}`;
      }
    //console.log(await `${id} is removed`)
    
    console.log({ deleted: true });
    return `${bandid1.name} has been successfully deleted!`
}
async function rename(id, newName){
    if(id==undefined){throw "Error: Id undefined"}
    if(typeof id!=="string"){throw "Error: Id should be string"}
    if(id.trim().length==0){throw " Error: String cannot be empty"}
    id=id.trim()
    if(!ObjectId.isValid(id)){throw"Error: Invalid Object Id"}

    if (newName==undefined){throw"Error: newName undefined"}
    if(typeof newName!=="string"){throw"Error: NewName should be string"}
    if(newName.trim().length==0){throw" Error: NewName cannot be empty spaces"}

    const bandCollection=await bands()
    let update={
        name:newName.trim()

    }
    const updateband=await bandCollection.updateOne({_id:ObjectId(id)},{$set:update})
    if(updateband.modifiedCount===0)
        {throw" Error: Could not Update Band"}
    return await this.get(id)

}




module.exports={
    create,
    getAll,
    get,
    remove,
    rename
}