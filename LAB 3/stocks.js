const axios = require('axios');
const p = require("./people");

async function getPeople(){
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json")
    return data
  }


async function getStock(){
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json")
    return data 
  }

async function listShareholders(stockName){
  let a
  if(typeof stockName=="undefined"||typeof stockName!=="string"){throw "Error: invalid output"}
  if(stockName.trim().length==0){throw "Error: Empty Spaces not allowed"}

  const stock=await getStock()
  const people=await getPeople()
  for(i=0;i<stock.length;i++){
    if(stock[i].stock_name==stockName){
      a=stock[i]
      b=stock[i].shareholders
      for(j=0;j<b.length;j++){
        // console.log( b[j])
        d=await p.getPersonById(b[j].userId.toString())
        fn = d.first_name
        ln = d.last_name
        b[j].first_name=fn
        b[j].last_name=ln
        x=b[j].number_of_shares
        delete b[j].number_of_shares
        b[j].number_of_shares=x
        delete b[j].userId
      }   
    }
  }
  if(a===undefined){throw"Error: Stockname not found"}
  return a
}

async function totalShares(stockName){
  let a
  let count=0
  let sum=0
  if(typeof stockName=="undefined"||typeof stockName!=="string"){throw "Error: invalid output"}
  if(stockName.trim().length==0){throw "Error: Empty Spaces not allowed"}
  const stock=await getStock()
  for(i=0;i<stock.length;i++){
    if(stock[i].stock_name==stockName){
      a=stock[i]
      shareholders=a.shareholders
      for (j=0;j<shareholders.length;j++){
        count++
        sum=sum+shareholders[j].number_of_shares
      }
    }
  }
  if(a===undefined){throw"Error: Stockname not found"}
  if(sum=="0"){
    return `${stockName} currently has no shareholders.`
  }else{
    return `${stockName}, has ${count} shareholders that own a total of ${sum} shares.`
  }
}



async function listStocks(firstName, lastName){
  if(typeof firstName=="undefined"){throw "Error: Enter first name"}
  if(typeof lastName=="undefined"){throw "Error: Enter last name"}
  if(typeof firstName!=="string"||typeof lastName!=="string"){throw "Error:invalid output"}
  if(firstName.trim().length==0||lastName.trim().length==0){throw "Error: Empty Spaces not allowed"}
  let a
  let result=[]
  

  const people=await getPeople()
  const stock=await getStock()
  for (i=0;i<people.length;i++){
    if(people[i].first_name==firstName && people[i].last_name==lastName){
      a=people[i]
    }
  }
  if(a===undefined){{throw"Error: Person not find in people.json" }}
  for(j=0;j<stock.length;j++){
    b=stock[j]
    shareholders=b.shareholders
    for (k=0;k<shareholders.length;k++){
      if(shareholders[k].userId==a.id){
        let final ={}
        c=stock[j]
        final.stockName=c.stock_name
        final.number_of_shares=shareholders[k].number_of_shares
        
        result.push(final)
        // delete shareholders[k].userId
        // shareholders[k].stockName=c.stock_name

      }
    }
  }
  

  if(result===undefined){throw"Error: Person not found"}
  return result

}






  async function getStockById(id){
      if (typeof id=="undefined"){throw"Error: Undefined type"}
      if (id.length==0){throw" Error: Empty String"}
      if (typeof id!=="string"){throw"Error:Invalid Output"}
      if(id.trim().length==0){throw"Error: Empty Spaces not allowed"}

      const stock=await getStock()
      let a
      for (i=0;i<stock.length;i++){
          if(stock[i].id==id){
            a = stock[i]
          }
      }
      if(a===undefined){throw"Error: Stock not found"}
      return a
  }




  module.exports={
    firstname: "Sahil Mahendra",
    lastname: "Mody",
    studentId: "20007262",
    getPeople,
    getStock,
    listShareholders,
    totalShares,
    listStocks,
    getStockById
  };