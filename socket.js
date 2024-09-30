const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },

  allowEIO3: true,
});

mongoose
  .connect(
    "mongodb+srv://adm_devops:ZGeC48LaIrCFBsD5@devops.mojcl.mongodb.net/dbDevOps?retryWrites=true&w=majority&appName=devops"
  )
  .then(() => {
    console.log("Connected To MongoDB Database");
  })
  .catch((err) => {
    console.log(err);
  });

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const lastToDisconnect = io.of("/").sockets.size === 0;
    if (lastToDisconnect) {
      try {
        if (global.gc) {
          global.gc();
        }
      } catch (e) {
        process.exit();
      }
    }
  });
});

httpServer.listen(2600, () => {
  console.log(`Socket Server Running On Port 2600`);
});
