const jwt=require("jsonwebtoken");

const Auth=(req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token",token);
  if(token){
    const decoded=jwt.verify(token,"task")
    console.log("decoded",decoded);
    if(decoded){
      console.log(decoded, 'decoded')
      req.user ={ userId : decoded.userID, user : decoded.user };
      next()
    }
    else{
      res.send({"msg":"user not logged in"});
    }
  }
  else{
    res.send({"msg":"user not logged in"})
  }
}




module.exports={
  Auth
}