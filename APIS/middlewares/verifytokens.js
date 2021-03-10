const jwt=require("jsonwebtoken")
const verifyToken=(req,res,next)=>{
    let tokenwithbearer=req.headers["authorization"]
    if(tokenwithbearer==undefined)
    {
        res.send({message:"failed",reason:"unauthorized access"})
    }
    else{
        let token=tokenwithbearer.slice(7,tokenwithbearer.length)
        jwt.verify(token,"abcdefabcdef",(err,decededToken)=>
        {
            if(err){
                res.send({message:"failed",reason:"Session Expired"})
            }
            else{
                next()
            }
        })
    }
}
module.exports=verifyToken