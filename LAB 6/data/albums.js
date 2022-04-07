const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const {ObjectId} = require('mongodb');
const ban=require('./bands');
const connection = require('../config/mongoConnection');

async function create(bandId, title, releaseDate, tracks, rating){
    if(bandId==undefined){throw "Error: Please provide Band-id"}
    if(title==undefined||releaseDate==undefined||tracks==undefined||rating==undefined){
        throw "Error: Album invalid output"
    }
    if(typeof bandId!="string"||typeof title!=="string"||typeof releaseDate!=="string"){throw" Error: input must be string"}
    if(bandId.trim().length==0||title.trim().length==0||releaseDate.trim().length==0){throw"Empty Spaces not allowed"}
    if(!ObjectId.isValid(bandId)){throw" Error: INvalid Object Id albums"}
    if(!Array.isArray(tracks)){throw "Error: Tracks must be array"}
    for(i=0;i<tracks.length;i++){
        if(typeof tracks[i]!=="string"){throw"Error: Tracks input must be string"}
        if(tracks[i].trim().length==0){throw" Error: Tracks input must not be empty spaces"}
    }
    if(tracks.length<3){throw" Error: There must be 3 tracks"}
    if (typeof rating!=="number"){throw"Error: Rating must be a number"}
    if(rating<1 || rating>5){throw"Error: Rating should be between 1 to 5"}
    let regex = /(((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|((0[13-9]|1[0-2])\/(29|3[01]29|30))|((0[13578]|1[0,2])\/31))\/[0-9]{4}/gim;
    if (!releaseDate.match(regex))
        throw "Error: Release date is not in proper format, Please enter proper date ";
    given=releaseDate
    current=new Date()
    current.setHours(0,0,0,0)
    given=new Date(given)
    if(given>current){throw"Error: Date mentioned should not be greater than current date"}
    if(releaseDate.substr(releaseDate.length-4)<1900){throw"Error: year should not be less than 1900"}
    

    const bandCollection=await bands();
    let id=ObjectId()
    let album={
        _id:id,
        title: title,
        releaseDate: releaseDate,
        tracks:tracks,
        rating:rating
    }
    const updateband=await bandCollection.updateOne({_id:ObjectId(bandId)},{$push:{albums:album}})
    if(updateband.modifiedCount===0)
    {throw" Error: Could not add album"}

    let sum=0
    let average=0

    const albumdata=await getAll(bandId);
    //console.log(albumdata)
    for( i=0;i<albumdata.length;i++){
        sum=sum+albumdata[i].rating
    }
    average=sum/albumdata.length
    const updateRating = await bandCollection.updateOne(
        { _id: ObjectId(bandId) },
        { $set: { overallRating: Number(average.toFixed(1)) } }
    );
    if(updateRating.modifiedCount===0)
    {throw" Error: Could not update rating"}





    const albumsid = await ban.get(bandId.toString());
    a=albumsid.albums
    for(m=0;m<a.length;m++){
        z= a[m]._id.toString();
    }
    const newalbum= await get(z);
    return albumsid;
}

async function getAll(bandId){
    if(bandId==undefined){throw"Error: bandId not defined"}
    if(typeof bandId!="string"){throw"Error: bandId should be string"}
    if(bandId.trim().length==0){throw"Error: Empty spaces not allowed"}
    if(!ObjectId.isValid(bandId)){throw"Error: NOt a proper object ID"}
    const bandCollection=await bands()
    const bandlist=await bandCollection.findOne({_id: ObjectId(bandId)})
    if(!bandlist){throw" Error: bandlist not found"}
    
    if (bandlist.albums.length == 0) throw '[]';
    let result = bandlist.albums;
    result.forEach((j) => {
        j._id = j._id.toString();
    });
    return result;
}


async function get(albumId){
    if(albumId==undefined){throw"Error: AlbumId not defined"}
    if(typeof albumId!="string"){throw"Error: bandId should be string"}
    if(albumId.trim().length==0){throw"Error: Empty spaces not allowed"}
    if(!ObjectId.isValid(albumId)){throw"Error: NOt a proper object ID"}


    const bandCollection=await bands()
    const bandlist=await bandCollection.find({}).toArray()
    if(!bandlist){throw" Error: bandlist not found"}
    // boolean=false
    // for (let i of bandlist){
    //     for (let j of i.albums){
    //         if(j._id.toString()==albumId){
    //             boolean==true
    //             j._id=j._id.toString()
    //             return j
    //         }
    //     }
    // }
    // if (boolean===false){throw" Error: Unable to get album"}

    const albumiid=await bandCollection.findOne({"albums._id":ObjectId(albumId)},{projection:{_id:0,"albums.$":1}})
    if(!albumiid){throw"Error: Albumid not available"}
    //return albumiid.albums
    const [r] = albumiid.albums;

    r._id = r._id.toString();

    return r;
}

async function remove(albumId){
    if(albumId==undefined){throw"Error: AlbumId not defined"}
    if(typeof albumId!="string"){throw"Error: bandId should be string"}
    if(albumId.trim().length==0){throw"Error: Empty spaces not allowed"}
    if(!ObjectId.isValid(albumId)){throw"Error: NOt a proper object ID"}
    sum=0
    average=0


    const bandCollection=await bands()
    const bandlist=await bandCollection.find({}).toArray()
    if(!bandlist){throw" Error: bandlist not found"}
    //const size = await bandCollection.find().count();
    const findalbum = await bandCollection.findOne({
        'albums._id': ObjectId(albumId),
    });
    if (!findalbum){throw"Error: Not able to find album"};

    const deletealbum = await bandCollection.updateMany(
        {},
        { $pull: { albums: { _id: ObjectId(albumId) } } }
    );
    const albumdata=await getAll(findalbum._id.toString());
    //console.log(albumdata)
    for( i=0;i<albumdata.length;i++){
        sum=sum+albumdata[i].rating
    }
    average=sum/albumdata.length
    const updateRating = await bandCollection.updateOne(
        { _id: ObjectId(findalbum._id) },
        { $set: { overallRating: Number(average.toFixed(1)) } }
    );
    if(updateRating.modifiedCount===0)
    {throw" Error: Could not update rating"}
    let result = { albumId: albumId, deleted: true };
    if (deletealbum.modifiedCount == 0) {throw"Error: COuld not delete review"};
    return result
}
// async function main1(){
//     console.log(await "-----------------------------------------------------------------------------")
// try{
//         album2 = await create("6229950bfbde57e6fae03397","sahil","03/10/2000",["hy","hello","god"],3);
//         console.log(await album2)
//     }
//     catch(e){
//         console.log(e)
//      }
// try{
//     console.log(await remove("6229950bfbde57e6fae0339a"))
// }
// catch(e){
//     console.log(e)
// }
// }
// main1()

module.exports={
    create,
    getAll,
    get,
    remove
}