const express = require('express');
const router = express.Router();
const data = require('../data');
const userApi = data.userApi;
router
.route('/people')
.get(async (req, res) => {
  try {
    const peopleList = await userApi.getPeople()
    res.json(peopleList);
  } catch (e) {
    res.status(500).send(e);
  }
})

router
.route('/work')
.get(async (req, res) => {
  try {
    const workList = await userApi.getWork()
    res.json(workList);
  } catch (e) {
    res.status(500).send(e);
  }
})

router
.route('/people/:id')
.get(async(req,res)=>{
    try{
      if (req.params.id==undefined){throw"Error: Id undefined"}
      if(/\s/.test(req.params.id)){throw" Spaces not allowed"}
      if(isNaN(Math.floor(req.params.id))){throw"Error: Invalid Id"}
      if(parseInt(req.params.id)<=0){throw"Error: Id number should be positive whole number"}
      const peoplebyid= await userApi.getPeoplebyId(Math.floor(req.params.id))
      res.json(peoplebyid);
    }
    catch(e){
      res.status(404).json(e)
    }
})
router
.route('/work/:id')
.get(async(req,res)=>{
  try{
    if (req.params.id==undefined){throw"Error: Id not found"}
    if(/\s/.test(req.params.id)){throw" Spaces not allowed"}
    if(isNaN(Math.floor(req.params.id))){throw"Error: Invalid Id"}
    if(parseInt(req.params.id)<=0){throw"Error: Id number should be positive whole number"}
    const workbyid=await userApi.getWorkbyId(Math.floor(req.params.id))
    res.json(workbyid)
  }
  catch(e){
    res.status(404).json(e)
  }
})


module.exports = router