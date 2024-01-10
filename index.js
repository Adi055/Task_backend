const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Router/userRouter");
const Port = 8080;
const app = express();
const cors = require("cors");
const { taskRouter } = require("./Router/taskrouter");
const { files } = require("./Router/uploadRouter");

// Set up CORS middleware with specific origin
const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/users", userRouter);
app.use("/task", taskRouter);
app.use("/upload", files);

// Handle OPTIONS requests
app.options("*", cors(corsOptions));


app.listen(Port, async () => {
  try {
    await connection;
    console.log("Connected to the database");
    console.log(`Server running on port ${Port}`);
  } catch (error) {
    console.error(error);
  }
});
