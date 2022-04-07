//const { Router } = require('express')
const express=require('express')
const router=express.Router()
const data=require('../data')
const show=data.shows

router
.get('/',async (req,res)=>{
    let input= req.body
    // let searchData=await show.getShowbySearch('under')
    res.render("handlebars/home",{char:input,title:"Show Finder"})
})

router 
.post('/searchshows', async (req,res)=>{
    let input=req.body
    // console.log(input);
    if(!input.showSearchTerm||input.showSearchTerm.trim().length==0){
        res.status(400).render("handlebars/error",{
            errorDescription:"Error: Search Item Undefined or Search Input cannot be empty ",
            title:'Error'
        })
        return;
    }
    try{
        searchdata=await show.getShowbySearch(input.showSearchTerm)
        // console.log(searchdata)
    }
    catch(e){
        res.status(400).render('handlebars/search',{
        showSearchTerm:input.showSearchTerm,
        errorDescription: "Could not find show with given search",
        hasErrors: true,
        error: e,
        title:'Error'
    })
    return
    }
    //res.json(searchdata)
    res.render('handlebars/search',{
        showSearchTerm: input.showSearchTerm,
        result:searchdata,
        title: 'Shows Found'
    })
})


router
.get('/show/:id', async (req,res)=>{
    try{
       var data1=await show.getShowbyId(parseInt(req.params.id))
         //console.log(data1)
    }
    catch(e){
        res.status(400).render('handlebars/error',{
        errorDescription: "Could not find show with given id",
        hasErrors: true,
        error: e,
        title:'Error'
        })
    return
    }

res.render('handlebars/eachShow', {
    id:data1.id,
    name: data1.name,
    title: data1.name,
    language: data1.language,
    path: data1.image,
    genre:data1.genres,
    rating: data1.rating.average,
    network:data1.network,
    Summary:data1.summary
})
})
module.exports =router;