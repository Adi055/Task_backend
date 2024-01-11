const express=require("express");
const { Auth } = require("../Middleware/auth");
const { taskModel } = require("../Schema/taskSchema");
const multer = require('multer');
const path=require("path")
require('dotenv').config();

const dynamicDomain = process.env.DYNAMIC_DOMAIN || 'localhost:8080';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const taskRouter=express.Router();


taskRouter.get("/",Auth,async(req,res)=>{
try {
  console.log("userID", req.user);
    const task = await taskModel.find({ userID: req.user.userId });
  res.send(task);
} catch (error) {
  res.status(404).send({ "error": error.message }); 
}

})


taskRouter.post("/add", Auth, upload.single('file'), async (req, res) => {
  try {
    // Check if a file is uploaded
    const dynamicURL = `http://${dynamicDomain}/${req.file.path}`;
    //const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    let fileData = null;
    if (req.file) {
      fileData = {
        buffer: req.file.buffer,
        mimetype: req.file.mimetype,
        
      };
    }

    //http://localhost:8080/${req.file.path}
    console.log("path file",req.file.path);
    // Add the userID to the task data
    const postTask = new taskModel({
      ...req.body,
      userID: req.user.userId,
      fileData:fileData, // Add file data to the task model
      path: dynamicURL,
    });

    await postTask.save();
    res.send({ "msg": "task has been added" });
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
});


// taskRouter.post("/add", Auth, upload.single('file'),async (req, res) => {
//   try {
//     // Add the userID to the task data
//     console.log(req.user, 'user????')
//     const postTask = new taskModel({...req.body, userID :req.user.userId});
//     console.log(postTask, 'postTask')
//     await postTask.save();
//     res.send({ "msg": "task has been added" });
//   } catch (error) {
//     res.status(404).send({ "error": error.message }); 
//   }
// });



  

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