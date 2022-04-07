const p = require("./people");
const s = require("./stocks");



async function main(){
    try{
      console.log(await p.getPersonById("aaa"));
    }
    catch(e)
    {
      console.log(e)
    }
    console.log(await "-----------------------------------------------------------------------------------")
    try{
      console.log(await p.sameEmail("google.com.hk"));
    }
    catch(e)
    {
      console.log(e)
    }
    console.log(await "-----------------------------------------------------------------------------------")

    try{
      console.log(await p.manipulateIp());
    }
    catch(e)
    {
      console.log(e)
    }
    console.log(await "-----------------------------------------------------------------------------------")
    try{
      console.log(await p.sameBirthday(3,31));
    }
    catch(e)
    {
      console.log(e)
    }
    console.log(await "-----------------------------------------------------------------------------------")
    try{
      console.log(await s.listShareholders("Aeglea BioTherapeutics, Inc."));
    }
    catch(e)
    {
      console.log(e)
    }
  console.log(await "-----------------------------------------------------------------------------------")

  try{
    console.log(await s.totalShares('Aeglea BioTherapeutics, Inc.'));
  }
  catch(e)
  {
    console.log(e)
  }
  console.log(await "-----------------------------------------------------------------------------------")

  try{
    console.log(await s.listStocks("Grenville", "Pawelke" ));
  }
  catch(e)
  {
    console.log(e)
  }
  console.log(await "-----------------------------------------------------------------------------------")


  try{
      console.log(await s.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"));
    }
    catch(e)
    {
      console.log(e)
    }
}

main();