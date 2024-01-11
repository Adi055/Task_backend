const mongoose=require('mongoose');



const taskSchema=mongoose.Schema({
  taskname:{type:String,required:true},
  description:{type:String,required:true},
  start_date:{type:String,required:true},
  end_date:{type:String,required:true},
  userID:{type:String,required:true},
  file: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  path:{type:String,required:true}
})

const taskModel=mongoose.model("task",taskSchema);


module.exports={
  taskModel
}