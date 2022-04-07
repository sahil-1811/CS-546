const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const {ObjectId} = require('mongodb');
const connection = require('../config/mongoConnection');


async function create(name,genre,website,recordLabel,bandMembers,yearFormed){
    if(name==undefined||genre==undefined||website==undefined||recordLabel==undefined||bandMembers==undefined||yearFormed==undefined){
        throw"Error: Invalid Output"}
    if(typeof name!=="string"||typeof website!=="string"||typeof recordLabel!=="string")
    {throw "Error: Input must be string"}
    if(name.trim().length==0||website.trim().length==0||recordLabel.trim().length==0)
    {throw "Error: Empty Spaces not allowed"}
    website=website.toLowerCase()
    if(website.endsWith(".com")!==true){throw "Error: Website must contain .com"}
    if(website.includes("http://www.")!==true){throw "Error: Website must contain http://www."}
    if(website.slice(11,-4).length<5){throw" Error: Should contain atleast 5 letters between http://www. and.com"}
    if(!Array.isArray(genre)){throw"Error: Genre should be array"}
    if(!Array.isArray(bandMembers)){throw"Error: BandMembers should be array"}
    if(genre.length<1 || bandMembers.length<1){throw"Error: should contain minimum one input"}
    for(i=0;i<genre.length;i++){
        if(typeof genre[i]!=="string"){throw "Error: Genre inputs should be strings"}
        if(genre[i].trim().length==0){throw"Error: Genre Empty strings not allowed"}
     }
    for(j=0;j<bandMembers.length;j++){
        if(typeof bandMembers[j]!=="string"){throw "Error: bandMembers inputs should be strings"}
        if(bandMembers[j].trim().length==0){throw"Error: bandMembers Empty strings not allowed"}
     }
    if(typeof yearFormed!=="number"){throw" Error: Year should be number"}
    if(yearFormed<1900 ||yearFormed>2022){throw" Error: Year Should be between 1900-2022"}

    const bandCollection=await bands();
    overallRating=0
    albums=[]
    let band = {
        // _id: ObjectId, 
        name: name.trim(),
        genre: genre,
        website: website.trim(),
        recordLabel : recordLabel.trim(),
        bandMembers : bandMembers,
        yearFormed : yearFormed,
        albums,
        overallRating
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
    const bandCollection=await bands()
    const bandlist=await bandCollection.find({},{projection: {_id: 1,name:1}}).toArray()
    if(!bandlist){throw" Error: bandlist not found"}
    answer=[]
    for(i=0;i<bandlist.length;i++){
        bandlist[i]._id=bandlist[i]._id.toString()
    }
    return bandlist
}
 async function get(id){
    if(id==undefined){throw"Error: Id not defined"}
    if(typeof id!=="string"){throw"Error: Id should be string"}
    if(id.trim().length==0){throw"Error: Id should not have empty spaces"}
    id=id.trim()
    if(!ObjectId.isValid(id)){throw"Error: Invalid Object ID"}
    

    const bandCollection=await bands()
    const bandid=await bandCollection.findOne(_id=ObjectId(id))
    if(!bandid){throw"bandid not found"}
    bandid._id=bandid._id.toString()
    return bandid
 }

 async function remove(id){
    if(id==undefined){throw"Error: Id not defined"}
    if(typeof id!=="string"){throw"Error: Id should be string"}
    if(id.trim().length==0){throw"Error: Id should not have empty spaces"}
    id=id.trim()
    if(!ObjectId.isValid(id)){throw"Error: Invalid Object ID"}
    

    const bandCollection=await bands()
    const bandid1=await bandCollection.findOne(_id=ObjectId(id))
    const delband=await bandCollection.deleteOne({_id:ObjectId(id)})
    if (delband.deletedCount === 0) {
        throw `Could not delete band with id of ${id}`;
      }
    return ({"bandId": id,"deleted":true})
 }

 async function update (id,name, genre, website, recordLabel, bandMembers, yearFormed){
    if(id==undefined||name==undefined||genre==undefined||website==undefined||recordLabel==undefined||bandMembers==undefined||yearFormed==undefined){
        throw"Error: Invalid Outputz"}
    if(typeof id!=="string"||typeof name!=="string"||typeof website!=="string"||typeof recordLabel!=="string")
        {throw "Error: Input must be string"}
    if(!ObjectId.isValid(id)){throw"Error: Invalid Object Id"}
    if(id.trim().length==0||name.trim().length==0||website.trim().length==0||recordLabel.trim().length==0)
    {throw "Error: Empty Spaces not allowed"}
    id=id.trim()
    website=website.toLowerCase()
    if(website.endsWith(".com")!==true){throw "Error: Website must contain .com"}
    if(website.includes("http://www.")!==true){throw "Error: Website must contain http://www."}
    if(website.slice(11,-4).length<5){throw" Error: Should contain atleast 5 letters between http://www. and.com"}
    if(!Array.isArray(genre)){throw"Error: Genre should be array"}
    if(!Array.isArray(bandMembers)){throw"Error: BandMembers should be array"}
    if(genre.length<1 || bandMembers.length<1){throw"Error: should contain minimum one input"}
    for(i=0;i<genre.length;i++){
        if(typeof genre[i]!=="string"){throw "Error: Genre inputs should be strings"}
        if(genre[i].trim().length==0){throw"Error: Genre Empty strings not allowed"}
     }
    for(j=0;j<bandMembers.length;j++){
        if(typeof bandMembers[j]!=="string"){throw "Error: bandMembers inputs should be strings"}
        if(bandMembers[j].trim().length==0){throw"Error: bandMembers Empty strings not allowed"}
     }
    if(typeof yearFormed!=="number"){throw" Error: Year should be number"}
    if(yearFormed<1900 ||yearFormed>2022){throw" Error: Year Should be between 1900-2022"}

    const bandCollection= await bands()
    album=[]
    overallRating=0
    let update={
        name: name.trim(),
        genre: genre,
        website: website.trim(),
        recordLabel : recordLabel.trim(),
        bandMembers : bandMembers,
        yearFormed : yearFormed,
        // albums:album,
        // overallRating:0

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
    update
}