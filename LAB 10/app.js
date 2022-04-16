const express=require('express')
const app=express()
const static=express.static(__dirname+'/public')
const session=require('express-session')

const configRoutes=require('./routes')
const exphbs=require('express-handlebars')
const path=require('path')

app.use('/public',static)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars',exphbs.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))

app.use(async (req,res,next)=>{
    let Timestamp=new Date().toUTCString()
    let requestMethod=req.method
    let requestRoute=req.originalUrl
    let auth='Authenticated User'
    let nonauth='Non-Authenticated User'
    if(req.session.user){
        console.log(`[${Timestamp}]:${requestMethod}${requestRoute} (${auth})`)
    }
    else{
        console.log(`[${Timestamp}]:${requestMethod}${requestRoute} (${nonauth})`)
    }
    next()

})


app.use('/private',(req,res,next)=>{
    if(!req.session.user){
        res.status(403).sendFile(path.resolve('static/404.html'))
    }
    else{
        next()
    }
})

app.use('/login',(req,res,next)=>{
    if(req.session.user){
        return res.redirect('/private')
    }
    else{
        req.method="POST"
        next()
    }

})


configRoutes(app)

app.listen(3000,()=>{
    console.log("We've now got a server!")
    console.log("Your routes will be running on http://localhost:3000")
})