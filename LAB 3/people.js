const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json")
    return data 
  }



async function getPersonById(id){
  if(typeof id==="undefined") {throw "Error:Undefined type"}
  if(typeof id!=="string"){throw"Error: Id Type should be string"}
  if(id.length===0){throw"Error:Empty String"}
  if(id.trim().length===0){throw"Error Empty Spaces not allowed"}

  let a
  const people= await getPeople()
  for(i=0;i<people.length;i++){
    if(id===people[i].id){
      a=people[i]
    }
  }
  
  if(a===undefined){
    throw "Error: person not found"
  }
  else{

    return a
  }
}


async function sameEmail(emailDomain){
  if(typeof emailDomain==="undefined") {throw "Error:Undefined type"}
  if(typeof emailDomain!=="string"){throw"Error: Email DOmain should be string"}
  if(emailDomain.length===0){throw"Error:Empty String"}
  if(emailDomain.trim().length===0){throw"Error Empty Spaces not allowed"}
  if(emailDomain.includes(".")==false){throw"Email Domain should contain a full stop"}
  emailDomain=emailDomain.toLowerCase()
  dot=emailDomain.substring(emailDomain.lastIndexOf(".")+1);
  beforedot=emailDomain.substr(0,emailDomain.indexOf("."));
  //console.log(beforedot)
  if(beforedot.length===0){throw "Error:SHould contain letters before the dot"}
  if(dot.length<2){throw "Error: There should be atleast two letters after the dot"}
  let b=[]
  let count=0
  const people= await getPeople()
  for(i=0;i<people.length;i++){
      if(Object.values(people[i]).toString().includes(emailDomain)){
        b.push(people[i])
      }
  }
  if(b.length<2){throw 'Error: There must be atleast two people of address'}
  return b

}

async function manipulateIp(){
  const people= await getPeople()
  max=parseInt(people[0].ip_address.replaceAll(".","").split("").sort().join(""))
  min=parseInt(people[0].ip_address.replaceAll(".","").split("").sort().join(""))
  let sum=0
  let count=0
  highest={}
  lowest={}
  for(i=0;i<people.length;i++){
    checkip=parseInt(people[i].ip_address.replaceAll(".","").split("").sort().join(""))
    if(checkip>max){
      max=checkip
      highest=people[i]
    }
    else if(checkip<min){
      min=checkip
      lowest=people[i]
    }
    sum=sum+checkip
    count++
  }
  const avg= Math.floor(sum/count)
  const object={
    "highest": {"firstName":highest["first_name"],"lastName":highest["last_name"],"average":avg},
    "lowest": {"firstName":lowest["first_name"],"lastName":lowest["last_name"],"average":avg}
  }

  return object

}

async function sameBirthday(month, day){
  if (typeof month=="undefined"){throw "Error: Enter month"}
  if (typeof day=="undefined"){throw "Error: Enter day"}
  if (isNaN(month) || typeof parseInt(month)!=="number"||isNaN(day) || typeof parseInt(day)!=="number"){throw"Error: Invalid Output"}
  if(typeof month=="string"&&month.trim().length===0||typeof day=="string"&&day.trim().length==0){throw"Error Empty Spaces not allowed"}

  if(month<1||month>12){throw "Error: There are only 1-12 months"}
  if(day<1||day>31){throw "Error: There are only 1-31 days"}
  if (month==4||month==6||month==9||month==11){
    if (day>30) {throw "Error: There only 30 days in given month" }
  }
  if (month==02){
    if (day>28) {throw "Error: There only 28 days in given month" }
  }





  const people= await getPeople()
  array=[]
  for (i=0;i<people.length;i++){
    birthday=people[i].date_of_birth.replaceAll("/","")
    birthdaymonth=birthday.substr(0,2);
    birthdaydate=birthday.substr(2,2);
    if(month==birthdaymonth&&day==birthdaydate){
      const fullname=people[i].first_name+" "+ people[i].last_name
      array.push(fullname)

    }

  }
  if(array.length==0){throw "Error: There are no birthday on this date"}
return array
}

module.exports={
  firstname: "Sahil Mahendra",
  lastname: "Mody",
  studentId: "20007262",
  getPeople,
  getPersonById,
  sameEmail,
  manipulateIp,
  sameBirthday
};