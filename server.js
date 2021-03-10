const exp=require("express")
const app=exp() 
//to read payload i.e data
const userApiObj=require("./APIS/user-api")
const adminApiObj=require("./APIS/admin-api")
//import path module
const path=require("path")
require("dotenv").config()
//merge this server with dist folder
app.use(exp.static(path.join(__dirname,'dist/meanapp')))
app.use("/user",userApiObj)
app.use("/admin",adminApiObj)
app.use(exp.json());
const dburl=process.env.DBURL
const mongoClient=require("mongodb").MongoClient
mongoClient.connect(
    dburl,{useUnifiedTopology: true,useNewUrlParser:true},(err, client)=>{
        if (err) {throw err}
        const dbObj=client.db("admindb")
        collObjUser=dbObj.collection("usercollection")
        collObjAdmin=dbObj.collection("admincollection")
        app.set("collvaruser",collObjUser)
        app.set("collvaradmin",collObjAdmin)
   
        console.log("Database Connected!");
       
      });
 //middleware to deal with invalid paths
 app.use((req,res,next)=>{res.send({message:req.url+" is not a valid path"})
})   
//error handler middleware
app.use((err,req,res,next)=>{res.send({message:err.message})})  
let port=process.env.PORT
app.listen(port,()=>{console.log("server started")})