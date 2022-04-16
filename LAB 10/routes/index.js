const userRoutes=require('./users')

const constructorMethod=(app)=>{
    app.use('/',userRoutes)

    app.use('*',(req,res)=>{
        res.json("404 Not Found")
    })

}

module.exports=constructorMethod