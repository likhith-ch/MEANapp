const exp=require("express")
const adminApiObj=exp.Router()
adminApiObj.use(exp.json())
module.exports=adminApiObj
adminApiObj.get("/getadmins",(req,res)=>{
    let collVar=req.app.get("collvaradmin")
    collVar.find().toArray().then(adminArray=>{res.send({message:adminArray})}).catch(err=>{res.send({message:err})})
 })
 adminApiObj.get('/getadmin/:adminname',(req,res)=>{
     let collVar=req.app.get("collvaradmin")
     collVar.findOne(
         {"username":req.params.adminname}).then(userfound=>{res.send(userfound)}).catch(err=>{res.send(err)})
 })
 adminApiObj.post("/createadmin",(req,res)=>{
     let collVar=req.app.get("collvaradmin")
     let dobj=req.body
     collVar.insertOne(dobj).then(res.send("admin Successfully created")).catch(res.send("unable to create admin"))
 })
 
 adminApiObj.post("/createadmins",(req,res)=>{
     let collVar=req.app.get("collvaradmin")
     let dobj=req.body
     collVar.insertMany(dobj).then(res.send("admins Successfully Created")).catch(res.send("unable to create admins"))
 })
 
 
 adminApiObj.put("/updateadmin/:id",(req,res)=>{
     let dobj=req.body
     let collVar=req.app.get("collvaradmin")
     collVar.updateOne({"id":parseInt(req.params.id)},{$set:dobj}).then(res.send("admin Successfully Updated")).catch(res.send("unable to Update admin"))
 })
 
 
 adminApiObj.put("/updateadmins/:id",(req,res)=>{
     let collVar=req.app.get("collvaradmin")
     let dobj=req.body
     collVar.updateMany({"id":parseInt(req.params.id)},{$set:dobj}).then(res.send("admins Successfully Updated")).catch(res.send("unable to Update admins"))
 }) 
 
 
 adminApiObj.delete("/deleteadmin/:id",(req,res)=>{
     let collVar=req.app.get("collvaradmin")
     collVar.deleteOne({"id":req.params.id}).then(res.send("admin Successfully Deleted")).catch(res.send("unable to delete admin"))
 })
 adminApiObj.delete("/deleteadmins/:id",(req,res)=>{
     let collVar=req.app.get("collvaradmin")
     collVar.deleteMany({"id":req.params.id}).then(res.send("admins Successfully Deleted")).catch(res.send("unable to delete admins"))
 })


 adminApiObj.post("/checkpasswordasync",async (req,res)=>{
    let collVar=req.app.get("collvaradmin")
    let dobj=req.body
    let adminFromDb= await collVar.findOne({"username":dobj.username})

    if(!adminFromDb || !bcrypt.compareSync(dobj.password,adminFromDb.password))
    {
    res.send(false)
    }
    else{
        res.send(true)
    }
})