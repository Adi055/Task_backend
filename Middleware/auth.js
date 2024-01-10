const jwt=require("jsonwebtoken");
const Auth=(req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1];
  if(token){
    const decoded=jwt.verify(token,"task")
    if(decoded){
       req.body.userID=decoded.user;
      // req.body.user=decoded.user
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