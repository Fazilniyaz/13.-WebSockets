const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = 8080;
const io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", (userName, userMessage) => {
    // io.emit("message", msg);
    console.log(`\n${userMessage} \n sent by : ${userName}`);
    io.emit("message", userName, userMessage);
  });

  socket.on("deleteMessage", (id) => {
    io.emit("deleteMessage", id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
