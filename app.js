const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/user");
const threadRoutes = require("./routes/thread");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to DevOps Tim 1 - By Tim");
});
app.use("/user", userRoutes);
app.use("/thread", threadRoutes);

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
  console.log("Ini Percobaan Tes Argo");
});
