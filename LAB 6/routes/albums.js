const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const band = data.bands;
const alb=data.albums;


router
.get('/:bandId', async (req,res)=>{
    if (req.params.bandId==undefined) {
        res.status(400).json({
            error: 'Provide an id, id cannot be empty',
        });
        return;
      }
      if(typeof req.params.bandId!=="string"){
        res.status(400).json({
          error: 'Only string input',
      });
      return;
      }
      if(/\s/.test(req.params.bandId)){
        res.status(400).json({error: "EMpty spaces not allowed"})
        return
      }
      if(!ObjectId.isValid(req.params.bandId)){
        res.status(400).json({error: "Improper Object ID"})
        return
      }
      try{
        const albumall= await alb.getAll(req.params.bandId)
        res.status(200).json(albumall);
        
      }
      catch(e){
        res.status(404).json(e)
      }
})
.post('/:bandId', async (req,res)=>{
    let albuminfo = req.body;
    const {
        title, 
        releaseDate, 
        tracks, 
        rating
    } = albuminfo;
    if (req.params.bandId==undefined) {
        res.status(400).json({
            error: 'Provide an id, id cannot be empty',
        });
        return;
      }
    if(typeof req.params.bandId!=="string"){
    res.status(400).json({
        error: 'Only string input',
    });
    return;
    }
    if(/\s/.test(req.params.bandId)){
    res.status(400).json({error: "EMpty spaces not allowed"})
    return
    }
    if(!ObjectId.isValid(req.params.bandId)){
    res.status(400).json({error: "Improper Object ID"})
    return
    }

    if(title==undefined||releaseDate==undefined||tracks==undefined||rating==undefined){
    res.status(400).json({
        error: 'Invalid Outputs',
    });
    return;
    }

    if(typeof title!=="string"||typeof releaseDate!=="string"){
    res.status(400).json({
        error: 'INput must be string',
    });
    return;
    }

    if(title.trim().length==0||releaseDate.trim().length==0){
        res.status(400).json({
            error: 'Empty Spaces not allowed',
        });
    return;
    }

    if(!Array.isArray(tracks)){
        res.status(400).json({
            error: 'Tracks should be array',
        });
    return;
    }

    for(i=0;i<tracks.length;i++){
        if(typeof tracks[i]!=="string")
        {res.status(400).json({
            error: 'Tracks should be string',
        });
        return;
        }
        if(tracks[i].trim().length==0)
        {res.status(400).json({
            error: 'Tracks input must not be empty spaces',
        });
        return;
        }
    }

    if(tracks.length<3==true){
        res.status(400).json({
            error: 'Track length should be minimum 3',
        });
    return;
    }

    if (typeof rating!=="number"){
        res.status(400).json({
            error: 'Rating must be a number',
        });
    return;
    }

    if(rating<1 || rating>5){
        res.status(400).json({
            error: 'Rating should be between 1 and 5 only',
        });
    return;
    }

    let regex = /(((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|((0[13-9]|1[0-2])\/(29|3[01]29|30))|((0[13578]|1[0,2])\/31))\/[0-9]{4}/gim;

    if (!releaseDate.match(regex)){
        res.status(400).json({
            error: 'Release date is not in proper format, Please enter proper date ',
        });
    return;
    }

    given=releaseDate
    current=new Date()
    current.setHours(0,0,0,0)
    given=new Date(given)

    if(given>current){
        res.status(400).json({
            error: 'Date mentioned should not be greater than current date ',
        });
    return;
    }

    if(releaseDate.substr(releaseDate.length-4)<1900){
        res.status(400).json({
            error: 'year should not be less than 1900 ',
        });
    return;
    }






    try{
    const albumcreate= await alb.create(req.params.bandId,title, 
        releaseDate, 
        tracks, 
        rating)
    res.status(200).json(albumcreate);
    
    }
    catch(e){
    res.status(404).json(e)
    }

})
router
.route('/album/:albumId')
.get(async (req,res)=>{
    if (!req.params.albumId) {
        res.status(400).json({
            error: 'Provide an id, id cannot be empty',
        });
        return;
      }
      if(typeof req.params.albumId!=="string"){
        res.status(400).json({
          error: 'Only string input',
      });
      return;
      }
      if(/\s/.test(req.params.albumId)){
        res.status(400).json({error: "EMpty spaces not allowed"})
        return
      }
      if(!ObjectId.isValid(req.params.albumId)){
        res.status(400).json({error: "Improper Object ID"})
        return
      }
      try{
        const albumid5= await alb.get(req.params.albumId)
        res.status(200).json(albumid5);
      }
      catch(e){
        res.status(404).json(e)
      }
})

router.delete('/:albumId', async (req,res)=>{
    if (!req.params.albumId) {
      res.status(400).json({
          error: 'Provide an id, id cannot be empty',
      });
      return;
    }
    if(typeof req.params.albumId!=="string"){
      res.status(400).json({
        error: 'Only string input',
    });
    return;
    }
    if(/\s/.test(req.params.albumId)){
      res.status(400).json({error: "EMpty spaces not allowed"})
      return
    }
    if(!ObjectId.isValid(req.params.albumId)){
      res.status(400).json({error: "Improper Object ID"})
      return
    }
    try{
      const albumid3= await alb.remove(req.params.albumId)
      res.status(200).json(albumid3);
    }
    catch(e){
      res.status(404).json(e)
    }
});




module.exports = router;