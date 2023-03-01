const express = require("express");
const app = express();

const http = require("http").Server(app);
const cors = require("cors");

const { users } = require("./lib/users");
const { listComments, createComment } = require("./lib/comments");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = 4000;

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/comments", (req, res) => {
  const comments = listComments();
  res.json(comments);
});

// Replace our create comment handler
app.post("/comments", async (req, res) => {
  const comment = createComment(req.body);
  io.emit("new-comment", { comment });
  res.json(comment);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
