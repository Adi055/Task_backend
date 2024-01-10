const express=require("express");
const multer=require('multer');
const { FileModel } = require("../Schema/fileSchema");

const upload = multer({ dest: 'uploads/' });

const files=express.Router()


files.post("/",upload.single('file'),async(req,res)=>{
try {
  const { buffer, mimetype } = req.file
  const newfile= new FileModel({
    
       buffer,
       mimetype,
    
  });
  await newfile.save();
  res.json({ message: 'File uploaded successfully!' });
  
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
})


module.exports={
  files
}