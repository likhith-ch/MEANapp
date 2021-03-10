const exp=require("express")
const userApiObj=exp.Router()
const bcrypt = require('bcrypt');
const verifyToken=require('./middlewares/verifytokens')
const errHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken")
userApiObj.use(exp.json())
module.exports=userApiObj
userApiObj.get("/getusers",(req,res)=>{
   let collVar=req.app.get("collvaruser")
   collVar.find().toArray().then(userArray=>{res.send({message:userArray})}).catch(err=>{res.send({message:err})})
})


userApiObj.get("/getusersasync",async (req,res)=>{
    let collVar=req.app.get("collvaruser")
    let userArray= await collVar.find().toArray()
    res.send(userArray)

 })


userApiObj.get('/getuser/:username',(req,res)=>{
    let collVar=req.app.get("collvaruser")
    collVar.findOne(
        {"username":req.params.username}).then(userfound=>{res.send(userfound)}).catch(err=>{res.send(err)})
})


userApiObj.get('/getuserasync/:username',verifyToken, errHandler( async (req,res)=>{
    let collVar=req.app.get("collvaruser")
    let user= await collVar.findOne({"username":req.params.username})
    res.send(user);
}))



userApiObj.post("/createuser",(req,res)=>{
    let collVar=req.app.get("collvaruser")
    let dobj=req.body
    let hashpassword=bcrypt.hashSync(dobj.password,2)
    dobj.password=hashpassword
    collVar.insertOne(dobj).then(res.send("user Successfully created")).catch(res.send("unable to create user"))
})


userApiObj.post("/createuserasync",async (req,res)=>{
    let collVar=req.app.get("collvaruser")
    let dobj=req.body
    let nameFromDb= await collVar.findOne({"username":dobj.username})
    if(nameFromDb!=null){
        res.send({message:"user already exists"})
    }
    else{
    let hashpassword=bcrypt.hashSync(dobj.password,2)
    dobj.password=hashpassword
    let result = await collVar.insertOne(dobj)
    res.send({message:"user successfully created"})
    }
})


userApiObj.post("/checkpasswordasync",async (req,res)=>{
    let collVar=req.app.get("collvaruser")
    let dobj=req.body
    let userFromDb= await collVar.findOne({"username":dobj.username})
    if(!userFromDb){
        res.send({message:"invalid username"})
    }

    else if(!userFromDb || !bcrypt.compareSync(dobj.password,userFromDb.password))
    {
    res.send(false)
    }
    else{
        let signedToken= await jsonwebtoken.sign({username:userFromDb.username},process.env.SECRET,{expiresIn:10})
        res.send({message:"login success",token:signedToken,username:userFromDb.username})
    }
})




userApiObj.post("/createusers",(req,res)=>{
    let collVar=req.app.get("collvaruser")
    let dobj=req.body
    collVar.insertMany(dobj).then(res.send("users Successfully Created")).catch(res.send("unable to create users"))
})


userApiObj.put("/updateuser/:username",errHandler(async (req,res)=>{
    let dobj=req.body
    let collVar=req.app.get("collvaruser")
    let hashpassword=bcrypt.hashSync(dobj.password,2)
    dobj.password=hashpassword
    let updated=await collVar.updateOne({"username":req.params.username},{$set:dobj})
    res.send({message:"user Successfully Updated"})
}))


userApiObj.put("/updateusers/:username",(req,res)=>{
    let collVar=req.app.get("collvaruser")
    let dobj=req.body
    collVar.updateMany({"username":req.params.username},{$set:dobj}).then(res.send("users Successfully Updated")).catch(res.send("unable to Update users"))
}) 


userApiObj.delete("/deleteuser/:username",async (req,res)=>{
    let collVar=req.app.get("collvaruser")
    let deluser= await collVar.deleteOne({"username":req.params.username})
    res.send({message:"user deleted successfully"})
})
userApiObj.delete("/deleteusers/:id",(req,res)=>{
    let collVar=req.app.get("collvaruser")
    collVar.deleteMany({"id":req.params.id}).then(res.send("users Successfully deleted")).catch(res.send("unable to delete users"))
})