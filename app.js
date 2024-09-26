const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/user");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://adm_devops:ZGeC48LaIrCFBsD5@devops.mojcl.mongodb.net/dbDevOps?retryWrites=true&w=majority&appName=devops"
  )
  .then(() => {
    console.log("Connected To MongoDb Database");
  });

app.listen("2500", () => {
  console.log("Server is running on port 2500");
});
