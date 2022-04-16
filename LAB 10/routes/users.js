const express=require('express')
const router=express.Router()
const userdata=require('../data/users')


router.get('/',async (req,res)=>{
    if(req.session.user){
        return res.redirect('/private')
    }
    else{
        res.render('login/loginform',{title:'Login'})
        return
    }
})

router.get('/signup',async (req,res)=>{
    if(req.session.user){
        return res.redirect('/private')
    }
    else{
        res.render('login/signup',{title:'Sign Up',hasErrors:false})
        return
    }
})

router.post('/signup',async(req,res)=>{
try{
    const {username,password}=req.body;
    let checkspaces=/\s/g
    let checkuser=/^[a-z0-9]+$/i
    let checkpassword=/^[a-z0-9\W]+$/i

    if(!username.trim()||!password.trim()){
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:'Error: You did not provide Username or Password',
            title:'Signup'
        })
        return
    }
    if(typeof username!=='string'||typeof password!=='string'){
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:'Error: Username or Password must be String',
            title:'Signup'
        })
        return
    }
    if(username.match(checkspaces)||password.match(checkspaces)){
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:'Error: Empty Spaces not allowed',
            title:'Signup'
        })
        return
    }
    if(!username.match(checkuser)){
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:'Error: Username input is invalid',
            title:'Signup'
        })
        return
    }
    if(!password.match(checkpassword)){
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:'Error: Password  input is invalid',
            title:'Signup'
        })
        return
    
    }
    if(username.length<4){
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:'Error: Username should be atleast 4 letters',
            title:'Signup'
        })
        return
    }

    if(password.length<6){
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:'Error: Password should be atleast 6 letters',
            title:'Signup'
        })
        return
    }
    username3=username.toLowerCase()
    const storeuser= await userdata.createUser(username3,password)
    if(storeuser.userInserted==true){
        return res.redirect('/')
    }
    else{
        res.status(400).render('login/signup',{
            hasErrors:true,
            error:"Error:User already exist",
            title:'Signup'
        })
        return
    }
}
catch(e){
    if(typeof e=='object'){
        if(e[1]){
            res.status(400).render('login/signup',{
                hasErrors:true,
                error:e[1],
                title:'Signup'
            })
            return
        }
        else{
            res.status(500).render('login/signup',{
                hasErrors:true,
                error:"Internal Server Error",
                title:"Signup"
            })
            return
        }
    }
}
})

router.post('/login',async (req,res)=>{
    try{
        const {username,password}=req.body;
        let checkspaces=/\s/g
        let checkuser=/^[a-z0-9]+$/i
        let checkpassword=/^[a-z0-9\W]+$/i
    
        if(!username.trim()||!password.trim()){
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error:'Error: You did not provide Username or Password',
                title:'Login'
            })
            return
        }



        if(typeof username!=='string'||typeof password!=='string'){
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error:'Error: Username or Password must be String',
                title:'Login'
            })
            return
        }
        if(username.match(checkspaces)||password.match(checkspaces)){
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error:'Error: Empty Spaces not allowed',
                title:'Login'
            })
            return
        }
        if(!username.match(checkuser)){
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error:'Error: Username input is invalid',
                title:'Login'
            })
            return
        }
        if(!password.match(checkpassword)){
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error:'Error: Password  input is invalid',
                title:'Login'
            })
            return
        
        }
        if(username.length<4){
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error:'Error: Username should be atleast 4 letters',
                title:'Login'
            })
            return
        }
    
        if(password.length<6){
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error:'Error: Password should be atleast 6 letters',
                title:'Login'
            })
            return
        }
       let username4=username.toLowerCase()
    //    console.log(username4)
       let checkus=await userdata.checkUser(username4,password)
    //    console.log("routes"+checkus)
        if(checkus.authenticated==true){
            req.session.user={Username:username}
            res.redirect('/private')
            return
        }
        else{
            res.status(400).render('login/loginform',{
                hasErrors:true,
                error: "Did not provide a valid username and/or password",
                title:"Login"
            })
            return
        }

    }
    catch(e){
        if(typeof e=='object'){
            // console.log('error'+e)
            // if(e[1].length>0){
                res.status(400).render('login/loginform',{
                    hasErrors:true,
                    error:e[1],
                    title:'Login'
                })
                return
            // }
        }
        else{
            res.status(500).render('login/loginform',{
                hasErrors:true,
                error:'Internal Server Error',
                title:'Login'
            })
            return
        }
    }

})



router.get('/private',async (req,res)=>{
    const username=req.session.user.Username
    let username1=username.toLowerCase()
    res.render('login/private',{title:"Private",username:username1})
})


router.get('/logout',async(req,res)=>{
    req.session.destroy()
    res.render('login/logout',{title:'Logout'})
})

module.exports=router;