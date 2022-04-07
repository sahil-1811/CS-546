const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const band = data.bands;


router
// .route('/bands')
.get('/', async (req, res) => {
  try {
    const BandList = await band.getAll()
    res.status(200).json(BandList);
  } catch (e) {
    res.status(500).send(e);
  }
})
.post('/', async (req,res)=>{
  let bandinfo = req.body;
    const {
        name,
        genre,
        website,
        recordLabel,
        bandMembers,
        yearFormed
    } = bandinfo;
    if(name==undefined||genre==undefined||website==undefined||recordLabel==undefined||bandMembers==undefined||yearFormed==undefined){
      res.status(400).json({
        error: 'Invalid Output',
    });
    return;
    }

    if(typeof name!=="string"||typeof website!=="string"||typeof recordLabel!=="string"){
      res.status(400).json({
        error: 'Input must be string',
    });
    return;
    }

    if(name.trim().length==0||website.trim().length==0||recordLabel.trim().length==0){
      res.status(400).json({
        error: 'EMpty Spaces not allowed',
    });
    return;
    }
    website.toLowerCase()
    if(website.endsWith(".com")!==true){
      res.status(400).json({
        error: 'Website must contain .com',
    });
    return;
    }

    if(website.includes("http://www.")!==true){
      res.status(400).json({
        error: 'Website must contain http://www.',
    });
    return;
    }

    if(website.slice(11,-4).length<5){
      res.status(400).json({
        error: 'Should contain atleast 5 letters between http://www. and.com',
    });
    return;
    }

    if(!Array.isArray(genre)){
      res.status(400).json({
        error: 'Error: Genre should be array',
    });
    return;
    }

    if(!Array.isArray(bandMembers)){
      res.status(400).json({
        error: 'Error: bandMembers should be array',
    });
    return;
    }

    if(genre.length<1 || bandMembers.length<1){
      res.status(400).json({
        error: 'Error: should contain minimum one input',
    });
    return;
    }

    for(i=0;i<genre.length;i++){
      if(typeof genre[i]!=="string"){
      res.status(400).json({
        error: 'Genre input should be string',
      });
      return;
      }
      if(genre[i].trim().length==0){
      res.status(400).json({
        error: 'Empty SPaces not allowed',
      });
      return;
      }
    }

   for(j=0;j<bandMembers.length;j++){
    if(typeof bandMembers[j]!=="string"){
    res.status(400).json({
      error: 'bandMembers input should be string',
    });
    return;
    }
    if(bandMembers[j].trim().length==0){
    res.status(400).json({
      error: 'Empty SPaces not allowed',
    });
    return;
    }
  }

  if(typeof yearFormed!=="number"){
    res.status(400).json({
      error: 'yearFormed should be number',
    });
  return;
  }

  if(yearFormed<1900 ||yearFormed>2022){
    res.status(400).json({
      error: 'Year Should be between 1900-2022"',
    });
  return;
  } 
  try {
    const createband = await band.create(
      name,genre,website,recordLabel,bandMembers,yearFormed
    );
    res.status(200).json(createband);
} catch (e) {
    res.status(400).json({ error: e });
}
})



router
.get('/:id', async (req, res)=>{
  if (!req.params.id) {
    res.status(400).json({
        error: 'Provide an id, id cannot be empty',
    });
    return;
  }
  if(typeof req.params.id!=="string"){
    res.status(400).json({
      error: 'Only string input',
  });
  return;
  }
  if(/\s/.test(req.params.id)){
    res.status(400).json({error: "EMpty spaces not allowed"})
    return
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({error: "Improper Object ID"})
    return
  }

  try{
    const bandid1= await band.get(req.params.id)
    res.status(200).json(bandid1);
    
  }
  catch(e){
    res.status(404).json(e)
  }
})
router.put('/:id', async (req,res)=>{
  let updatband = req.body;
    const {
        name,
        genre,
        website,
        recordLabel,
        bandMembers,
        yearFormed
    } = updatband;

  if (!req.params.id) {
    res.status(400).json({
        error: 'Provide an id, id cannot be empty',
    });
    return;
  }
  if(typeof req.params.id!=="string"){
    res.status(400).json({
      error: 'Only string input',
  });
  return;
  }
  if(/\s/.test(req.params.id)){
    res.status(400).json({error: "EMpty spaces not allowed"})
    return
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({error: "Improper Object ID"})
    return
  }

  if(name==undefined||genre==undefined||website==undefined||recordLabel==undefined||bandMembers==undefined||yearFormed==undefined){
    res.status(400).json({
      error: 'Invalid Outputs',
  });
  return;
  }

  if(typeof name!=="string"||typeof website!=="string"||typeof recordLabel!=="string"){
    res.status(400).json({
      error: 'Input must be string',
  });
  return;
  }

  if(name.trim().length==0||website.trim().length==0||recordLabel.trim().length==0){
    res.status(400).json({
      error: 'EMpty Spaces not allowed',
  });
  return;
  }
  website.toLowerCase()
  if(website.endsWith(".com")!==true){
    res.status(400).json({
      error: 'Website must contain .com',
  });
  return;
  }

  if(website.includes("http://www.")!==true){
    res.status(400).json({
      error: 'Website must contain http://www.',
  });
  return;
  }

  if(website.slice(11,-4).length<5){
    res.status(400).json({
      error: 'Should contain atleast 5 letters between http://www. and.com',
  });
  return;
  }

  if(!Array.isArray(genre)){
    res.status(400).json({
      error: 'Error: Genre should be array',
  });
  return;
  }

  if(!Array.isArray(bandMembers)){
    res.status(400).json({
      error: 'Error: bandMembers should be array',
  });
  return;
  }

  if(genre.length<1 || bandMembers.length<1){
    res.status(400).json({
      error: 'Error: should contain minimum one input',
  });
  return;
  }

  for(i=0;i<genre.length;i++){
    if(typeof genre[i]!=="string"){
    res.status(400).json({
      error: 'Genre input should be string',
    });
    return;
    }
    if(genre[i].trim().length==0){
    res.status(400).json({
      error: 'Empty SPaces not allowed',
    });
    return;
    }
  }

 for(j=0;j<bandMembers.length;j++){
  if(typeof bandMembers[j]!=="string"){
  res.status(400).json({
    error: 'bandMembers input should be string',
  });
  return;
  }
  if(bandMembers[j].trim().length==0){
  res.status(400).json({
    error: 'Empty SPaces not allowed',
  });
  return;
  }
}

if(typeof yearFormed!=="number"){
  res.status(400).json({
    error: 'yearFormed should be number',
  });
return;
}

if(yearFormed<1900 ||yearFormed>2022){
  res.status(400).json({
    error: 'Year Should be between 1900-2022"',
  });
return;
} 
id=req.params.id
try {
  const updateband2 = await band.update(
    id,name,genre,website,recordLabel,bandMembers,yearFormed
  );
  res.status(200).json(updateband2);
} catch (e) {
  res.status(404).json({ error: e });
}


})
.delete('/:id', async (req,res)=>{
  if (!req.params.id) {
    res.status(400).json({
        error: 'Provide an id, id cannot be empty',
    });
    return;
  }
  if(typeof req.params.id!=="string"){
    res.status(400).json({
      error: 'Only string input',
  });
  return;
  }
  if(/\s/.test(req.params.id)){
    res.status(400).json({error: "EMpty spaces not allowed"})
    return
  }
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json({error: "Improper Object ID"})
    return
  }
  try{
    const bandid2= await band.remove(req.params.id)
    res.status(200).json(bandid2);
  }
  catch(e){
    res.status(404).json(e)
  }



})




module.exports = router;
