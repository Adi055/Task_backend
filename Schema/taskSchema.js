const mongoose=require('mongoose');



const taskSchema=mongoose.Schema({
  taskname:{type:String,required:true},
  description:{type:String,required:true},
  start_date:{type:Date,required:true},
  end_date:{type:Date,required:true}
})

const taskModel=mongoose.model("task",taskSchema);


module.exports={
  taskModel
}