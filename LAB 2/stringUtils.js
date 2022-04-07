
// checkString=(string)=>{
//     if(typeof string== "undefined"){throw "Error: Undefined type"}
//     if(string.length<=0){throw "Error: String size should be greater than zero"}
//     if(typeof string!=="string"){throw "String is not of proper type"}
// }
// camelCase=(string)=>{
//     checkString(string)
//     string=string.toLowerCase()
//     a=string.split(" ")
//     result=""
//     for (i=0;i<a.length;i++){
//         let temp=a[i]
//         if(i!==0){
//             temp=temp.substr(0,1).toUpperCase()+temp.substr(1)   
//         }
//         result=result+temp
//     }
//     return result
// }


// replaceChar=(string)=>{
//     checkString(string)
//     let a= string
//     a=a.replaceAll(",",".")
//     array=a.split("")
//     let x = a[0]
//     let count=0
//     for(i=1;i<array.length;i++){
//         if(array[i].toLowerCase()==x.toLowerCase()){
//             count=count+1
//             if(count%2==1 && count != 0){
//                 array[i] = "*"
//             }
//             if(count%2==0 && count != 0){
//                 array[i] = "$"
//             }
//         }
//     }
//     a=array.join()
//     a=a.replaceAll(',','')
//     a=a.replaceAll(".",",")
//     return a
// }
// console.log(replaceChar("zzzzz"))




// mashUp=(string1,string2)=>{
//     checkString(string1)
//     checkString(string2)
//     if(string1.length<=1 || string2.length<=1){throw "Error: String length should be minimum 2"}
//     temp = string2.substr(0,2)+string1.substr(2)+" "+string1.substr(0,2)+string2.substr(2)
//     return temp
// }


// module.exports={
//     firstname: "Sahil Mahendra",
//     lastname: "Mody",
//     studentId: "20007262",
//     camelCase,
//     replaceChar,
//     mashUp
// };

function sayHello(firstName, lastName) {

    if (!firstName) throw 'You must supply the first name parameter'
  
    if (!lastName) throw 'You must supply the last name parameter'
  
    if (typeof firstName  != 'string') throw 'First Name Must Be A String';
  
    if (typeof lastName  != 'string') throw 'Last Name Must Be A String';
  
    return `Hello ${firstName} ${lastName}!  How are you?`;
  
  }

//   try{

//     sayHello('Patrick');
  
//   }catch(e){
  
//     console.log(e);
  
//   }
  
//   try{
  
//     sayHello();
  
//   }catch(e){
  
//     console.log(e);
  
//   }
  
//   try{
  
//     sayHello(1,2);
  
//   }catch(e){
  
//     console.log(e);
  
//   }
  
  try{
  
    console.log(sayHello('Patrick', 'Hill'));
  
  }catch(e){
  
    console.log(e);
  
  }
  

