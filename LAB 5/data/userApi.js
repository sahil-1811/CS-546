const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json")
    return data 
  }

  async function getWork(){
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json")
    return data
  }

  async function getPeoplebyId(id){
    if (id==undefined){throw"Error: Id not found"}
    if(/\s/.test(id)){throw" Spaces not allowed"}
    id=Math.floor(id)
    if(typeof id != "number"){throw "Error: Id should be number"}
    if(isNaN(id)){throw"Error: Invalid Id"}
    if(id<=0){throw"Error: Id number should be positive whole number"}
    

    const people=await getPeople()
    let result
    for(i=0;i<people.length;i++){
      if(id===people[i].id){
        result=people[i]
      }
    }
    if(result===undefined){throw " Error: People Id not found"}
    else{
      return result
    }
  }
  
  async function getWorkbyId(id){
    if (id==undefined){throw"Error: Id not found"}
    if(/\s/.test(id)){throw" Spaces not allowed"}
    id=Math.floor(id)
    if(typeof id != "number"){throw "Error: Id should be number"}
    if(isNaN(id)){throw"Error: Invalid Id"}
    if(id<=0){throw"Error: Id number should be positive whole number"}



    const work=await getWork()
    let result1
    for(i=0;i<work.length;i++){
      if(id===work[i].id){
        result1=work[i]
      }
    }
    if(result1===undefined){
      throw "Error: Work ID not found"
    }
    else{
      return result1
    }
    
  }



  //  async function main(){
    
  //  console.log(await getWorkbyId("30 0"))
  //  }
  // main()
  module.exports={
    getPeople,
    getWork,
    getPeoplebyId,
    getWorkbyId
  }