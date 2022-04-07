const axios = require('axios');

async function getShow(){
    const { data } = await axios.get("  http://api.tvmaze.com/shows ")
    return data 
  }

async function getShowbySearch(showSearchTerm){
  if(showSearchTerm==undefined){throw[400,"Error: Undefined Type"]}
  if(typeof showSearchTerm!=="string"){throw[400,"Enter String Value"]}
  if(showSearchTerm.trim().length==0){throw[400,"Error: Empty Spaces not allowed"]}

  const baseUrl="http://api.tvmaze.com/search/shows?q="+showSearchTerm
  const {data}=await axios.get(baseUrl)
  //console.log(data)
  
  if(data.length==0){throw"Error: Could not find any shows with that term"}
  return data.slice(5);

}

async function getShowbyId(Id){
  if(!Id){throw[400,"Error: Undefined Id"]}
  if(Id<0){throw[400,"Error: Id cannot be less than zero"]}
  if(typeof Id!=="number"){throw[400,"Error: Id should be a number"]}
  const idurl="http://api.tvmaze.com/shows/"+Id
    const {data}=await axios.get(idurl)
  
  if (data.length==0){throw[400,"Error:"]}
    return data
}


// async function main(){
//   // console.log( await getShowbyId(367))
// }
// main()

module.exports={
  getShow,
  getShowbySearch,
  getShowbyId
}