const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./Router/userRouter");
const Port=8080
const app=express();
const cors=require("cors");
const { taskRouter } = require("./Router/taskrouter");
const { files } = require("./Router/uploadRouter");
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/task",taskRouter);
app.use("/upload",files)

app.listen(Port,async()=>{
try {
  await connection
  console.log("connected to the db");
  console.log(`server running on port ${8080}`);
} catch (error) {
  console.log(error);
}

})