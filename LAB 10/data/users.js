const {object}=require('mongodb')
const bcrypt=require('bcryptjs')
const saltRounds=5

const mongoCollections =require('../config/mongoCollections')
const usercollection =mongoCollections.users



async function createUser(username, password){
    if(!username)throw[400,'Error: Username not provided']
    if(!password)throw[400,'Error: Password not provided']
    if(typeof username!=='string')throw[400,'Error: Username provided should be string']
    if(typeof password!=='string')throw[400,'Error: Password provided should be string']
    if(username.trim().length==0)throw[400,'Error: Username should not contain empty spaces']
    if(password.trim().length==0)throw[400,'Error: Password should not contain empty spaces']
    username1=username.toLowerCase()
    let checkspaces=/\s/g
    if(username.match(checkspaces))throw[400,"Error: Spaces between username is not valid"]
    if(password.match(checkspaces))throw[400,"Error: Spaces between password is not valid"]
    let checkuser=/^[a-z0-9]+$/i
    if(!username.match(checkuser))throw[400,"Error: Invalid Type for username"]
    let checkpassword=/^[a-z0-9\W]+$/i
    if(!password.match(checkpassword))throw[400,"Error: Invalid Type for password"]
    if(username.length<4)throw[400,"Error: Username length should be minimum of 4 letters"]
    if(password.length<6)throw[400,"Error: Password length should be minimum of 6 letters"]

    const usercoll=await usercollection()
    const finduser=await usercoll.findOne({username:username1})
    
    if(finduser===null){
        const hashPassword= await bcrypt.hash(password,saltRounds)
        const newUser={
            username:username1,
            password:hashPassword,
        }
        const insertUser=usercoll.insertOne(newUser)
        if(insertUser)return {userInserted:true}
        else{
            throw[500,"Error: Unable to signup"]
        }
    }
    else{
        throw[500,'Error:user already exist']
    }
}


async function checkUser(username, password){
    let hashCompare=false
    if(!username)throw[400,'Error: Username not provided']
    if(!password)throw[400,'Error: Password not provided']
    if(typeof username!=='string')throw[400,'Error: Username provided should be string']
    if(typeof password!=='string')throw[400,'Error: Password provided should be string']
    if(typeof password!=='string')throw[400,'Error: Password provided should be string']
    if(username.trim().length==0)throw[400,'Error: Username should not contain empty spaces']
    if(password.trim().length==0)throw[400,'Error: Password should not contain empty spaces']
   let username2=username.toLowerCase()
    let checkspaces=/\s/g
    if(username.match(checkspaces))throw[400,"Error: Spaces between username is not valid"]
    if(password.match(checkspaces))throw[400,"Error: Spaces between password is not valid"]
    let checkuser=/^[a-z0-9]+$/i
    if(!username.match(checkuser))throw[400,"Error: Invalid Type for username"]
    let checkpassword=/^[a-z0-9\W]+$/i
    if(!password.match(checkpassword))throw[400,"Error: Invalid Type for password"]
    if(username.length<4)throw[400,"Error: Username length should be minimum of 4 letters"]
    if(password.length<6)throw[400,"Error: Password length should be minimum of 6 letters"]
    
    
    const usercoll=await usercollection()
    const finduser=await usercoll.findOne({username:username2})
    // console.log(finduser)
    
    if(finduser){

         hashCompare= await bcrypt.compare(password,finduser.password)
         //console.log(hashCompare)
        if(hashCompare){
            return{authenticated: true}
        }
        else{
            throw[404,"Error:Either the username or password is invalid"]
        }
    }
    else{
        throw[404,"Error:Either the username or password is invalid"]
    }
} 


// async function main(){
//     try{
//         console.log(await checkUser("Yyyyy","Yyyyyy"))
//     }
//     catch(e){
//         console.log(e)
//     }
// }
// main()



module.exports={
    createUser,
    checkUser
}