const express=require("express");
const { Auth } = require("../Middleware/auth");
const { taskModel } = require("../Schema/taskSchema");

const taskRouter=express.Router();


taskRouter.get("/",async(req,res)=>{
try {
  const task=await taskModel.find({userID:req.body.userID});
  res.send(task)
} catch (error) {
  res.send({"error":error})
}

})


taskRouter.post("/add",async(req,res)=>{
  try {
    const PostTask= new taskModel(req.body);
    await PostTask.save();
    res.send({"msg":"task has been added"})
  } catch (error) {
    res.send({"error":error})
  }
  
  })
  

  taskRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    const task = await taskModel.findOne({_id:id})
    try {
      if(req.body.userID!==task.userID){
        res.send({"msg":"you are not authorized"})
      }
      else{
        await taskModel.findByIdAndUpdate({_id:id},req.body);
        res.send({"msg":"user has been updated"})
      }

    } catch (error) {
      res.send({"error":error})
    }
    
    })
    
    taskRouter.delete("/delete/:id",async(req,res)=>{
      const {id}=req.params;
      const task = await taskModel.findOne({_id:id})
      try {
        if(req.body.userID!==task.userID){
          res.send({"msg":"you are not authorized"})
        }
        else{
          await taskModel.findByIdAndDelete({_id:id});
          res.send({"msg":"user has been deleted"})
        }
  
      } catch (error) {
        res.send({"error":error})
      }
      
      })
      


module.exports={
  taskRouter
}